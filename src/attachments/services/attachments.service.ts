import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/aws/dto/file-input.dto';
import { ATTACHMENT_TITLES } from 'src/lib/constants';
import { PaginationService } from 'src/pagination/pagination.service';
import PatientAttachmentsInput from 'src/patients/dto/patient-attachments-input.dto';
import { PatientAttachmentsPayload } from 'src/patients/dto/patients-attachments-payload.dto';
import { PracticeService } from 'src/practice/practice.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { AwsService } from '../../aws/aws.service';
import { AttachmentWithPreSignedUrl } from '../dto/attachment-payload.dto';
import { attachmentInput, CreateAttachmentInput } from '../dto/create-attachment.input';
import { GetAttachmentsByAgreementId, GetAttachmentsByLabOrder, GetAttachmentsByPolicyId, UpdateAttachmentInput, UpdateAttachmentMediaInput } from '../dto/update-attachment.input';
import { Attachment } from '../entities/attachment.entity';
import { AttachmentMetadata } from '../entities/attachmentMetadata.entity';
import { DocumentType } from '../entities/documentType.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentsRepository: Repository<Attachment>,
    @InjectRepository(AttachmentMetadata)
    private attachmentMetadataRepository: Repository<AttachmentMetadata>,
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
    private readonly awsService: AwsService,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => PracticeService))
    private readonly practiceService: PracticeService,
  ) { }

  /**
   * Creates attachment
   * @param file 
   * @param createAttachmentInput 
   * @returns  
   */
  async createAttachment(createAttachmentInput: CreateAttachmentInput): Promise<Attachment> {
    const { labOrderNum, policyId, documentTypeId, documentTypeName, documentDate,
      practiceId, signedBy, signedAt, comments, agreementId, ...attachmentInput } = createAttachmentInput
    const attachmentsResult = this.attachmentsRepository.create(attachmentInput)
    let createMetaDataParams: attachmentInput = {}
    if (labOrderNum) {
      createMetaDataParams.labOrderNum = labOrderNum
    }

    if (policyId) {
      createMetaDataParams.policyId = policyId
    }

    if (policyId) {
      createMetaDataParams.policyId = policyId
    }

    if (agreementId) {
      createMetaDataParams.agreementId = agreementId
    }

    if (documentTypeId) {
      createMetaDataParams.documentTypeId = documentTypeId
    }

    if (documentTypeName) {
      createMetaDataParams.documentTypeName = documentTypeName
    }

    if (comments) {
      createMetaDataParams.comments = comments
    }

    if (documentDate) {
      createMetaDataParams.documentDate = documentDate
    }

    if (Object.keys(createMetaDataParams).length) {
      const attachmentMetadata = this.attachmentMetadataRepository.create(createMetaDataParams)
      let documentType
      if (documentTypeId) {
        documentType = await this.documentTypeRepository.findOne({ id: documentTypeId })
        attachmentMetadata.documentType = documentType
      } else if (documentTypeName) {
        const documentTypeInstance = this.documentTypeRepository.create({ type: documentTypeName })
        if (practiceId) {
          const practice = await this.practiceService.findOne(practiceId)
          documentTypeInstance.practice = practice
        }
        documentType = await this.documentTypeRepository.save(documentTypeInstance)
        attachmentMetadata.documentType = documentType
      }

      const createdMetaData = await this.attachmentMetadataRepository.save(attachmentMetadata)

      attachmentsResult.attachmentMetadata = createdMetaData
      attachmentsResult.attachmentMetadataId = createdMetaData.id
    }

    return await this.attachmentsRepository.save(attachmentsResult)
  }

  /**
   * Uploads attachment
   * @param file 
   * @param createAttachmentInput 
   * @returns  
   */
  async uploadAttachment(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput) {
    const attachment = await this.createAttachment(updateAttachmentMediaInput)
    updateAttachmentMediaInput.id = attachment.id
    const attachments = await this.uploadMedia(file, updateAttachmentMediaInput)
    const attachmentInfo = await this.attachmentsRepository.findOne({ id: attachment.id })
    const attachmentData = await this.updateAttachmentMedia({ ...attachmentInfo, ...attachments })
    if (attachments.url) {
      return attachmentData
    }
    throw new PreconditionFailedException({
      status: HttpStatus.PRECONDITION_FAILED,
      error: 'Could not upload media',
    });
  }

  /**
   * Updates attachment
   * @param file 
   * @param updateAttachmentMediaInput 
   * @returns  
   */
  async updateAttachment(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput) {
    const existingAttachment = await this.attachmentsRepository.findOne(updateAttachmentMediaInput.id)
    if (existingAttachment) {
      const deletedRemoteFile = await this.awsService.removeFile(existingAttachment.key);
      if (deletedRemoteFile) {
        const attachments = await this.uploadMedia(file, updateAttachmentMediaInput);
        if (attachments.url) {
          return await this.updateAttachmentMedia(attachments)
        }
        throw new PreconditionFailedException({
          status: HttpStatus.PRECONDITION_FAILED,
          error: 'Could not upload media',
        });
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not delete media file',
      });
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Attachment not found',
    });
  }

  /**
   * Finds attachments
   * @param id 
   * @param type 
   * @returns attachments 
   */
  async findAttachments(id: string, type: string): Promise<Attachment[]> {
    try {
      return await this.attachmentsRepository.find({
        where: { typeId: id, type: type },
        order: { createdAt: "ASC" },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Finds profile attachment
   * @param id 
   * @param type 
   * @returns profile attachment 
   */
  async findProfileAttachment(id: string, type: string): Promise<string> {
    try {
      const attachment = await this.attachmentsRepository.findOne({
        where: { typeId: id, type: type, title: ATTACHMENT_TITLES.ProfilePicture },
      });
      if (attachment) {
        return await this.awsService.getFile(attachment.key);
      }
      return null
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Patients attachments
   * @param patientAttachmentsInput 
   * @returns attachments 
   */
  async patientAttachments(patientAttachmentsInput: PatientAttachmentsInput): Promise<PatientAttachmentsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Attachment>(this.attachmentsRepository, patientAttachmentsInput)
      return {
        pagination: {
          ...paginationResponse
        },
        attachments: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds attachments by id
   * @param id 
   * @returns attachments by id 
   */
  async findAttachmentsById(id: string): Promise<Attachment[]> {
    return await this.attachmentsRepository.find({
      where: { typeId: id }
    });
  }

  /**
   * Gets attachment
   * @param id 
   * @returns attachment 
   */
  async getAttachment(id: string): Promise<Attachment> {
    return await this.attachmentsRepository.findOne({
      where: { id }
    });
  }

  /**
   * Finds attachments by lab order
   * @param getAttachmentsByLabOrder 
   * @returns attachments by lab order 
   */
  async findAttachmentsByLabOrder(getAttachmentsByLabOrder: GetAttachmentsByLabOrder): Promise<Attachment[]> {
    const { orderNum, typeId } = getAttachmentsByLabOrder
    return await this.attachmentsRepository.find({
      relations: ['attachmentMetadata'],
      where: {
        attachmentMetadata: {
          labOrderNum: orderNum,
        },
        typeId
      }
    });
  }

  /**
   * Finds attachments by policy id
   * @param getAttachmentsByPolicyId 
   * @returns attachments by policy id 
   */
  async findAttachmentsByPolicyId(getAttachmentsByPolicyId: GetAttachmentsByPolicyId): Promise<AttachmentWithPreSignedUrl[]> {
    const { policyId, typeId } = getAttachmentsByPolicyId
    const attachments = await this.attachmentsRepository.find({
      relations: ['attachmentMetadata'],
      where: {
        attachmentMetadata: {
          policyId: policyId,
        },
        typeId
      }
    });

    const attachmentsWithPreSignedUrl = await Promise.all(
      attachments.map(async attachment => {
        const preSignedUrl = await this.getMedia(attachment.id)

        return {
          ...attachment,
          preSignedUrl: preSignedUrl
        }
      })
    )

    return attachmentsWithPreSignedUrl
  }

  /**
   * Finds attachments by agreement id
   * @param getAttachmentsByAttachmentId 
   * @returns attachments by agreement id 
   */
  async findAttachmentsByAgreementId(getAttachmentsByAttachmentId: GetAttachmentsByAgreementId): Promise<AttachmentWithPreSignedUrl[]> {
    const { agreementId, typeId } = getAttachmentsByAttachmentId
    const attachments = await this.attachmentsRepository.find({
      relations: ['attachmentMetadata'],
      where: {
        attachmentMetadata: {
          agreementId: agreementId,
        },
        typeId
      }
    });

    const attachmentsWithPreSignedUrl = await Promise.all(
      attachments.map(async attachment => {
        const preSignedUrl = await this.getMedia(attachment.id)

        return {
          ...attachment,
          preSignedUrl: preSignedUrl
        }
      })
    )

    return attachmentsWithPreSignedUrl
  }

  /**
   * Updates attachment media
   * @param updateAttachmentInput 
   * @returns attachment media 
   */
  async updateAttachmentMedia(updateAttachmentInput: UpdateAttachmentInput): Promise<Attachment> {
    try {
      const { comments, labOrderNum, signedAt, signedBy, documentTypeId, documentTypeName, policyId, practiceId, documentDate, agreementId, ...attachmentInputToUpdate } = updateAttachmentInput
      let attachmentMetadataInput: attachmentInput = {}
      if (comments)
        attachmentMetadataInput.comments = comments;
      if (labOrderNum)
        attachmentMetadataInput.labOrderNum = labOrderNum;
      if (signedAt)
        attachmentMetadataInput.signedAt = signedAt;
      if (signedBy)
        attachmentMetadataInput.signedBy = signedBy
      if (policyId)
        attachmentMetadataInput.policyId = policyId
      if (documentDate) {
        attachmentMetadataInput.documentDate = documentDate;
      }
      if (agreementId) {
        attachmentMetadataInput.agreementId = agreementId
      }
      const updatedAttachment = await this.utilsService.updateEntityManager(Attachment, updateAttachmentInput.id, attachmentInputToUpdate, this.attachmentsRepository)
      if (updatedAttachment.attachmentMetadata) {
        let documentType
        if (documentTypeId) {
          documentType = await this.documentTypeRepository.findOne({ id: documentTypeId })
          updatedAttachment.attachmentMetadata.documentType = documentType
        } else if (documentTypeName) {
          const documentTypeInstance = this.documentTypeRepository.create({ type: documentTypeName })
          if (practiceId) {
            const practice = await this.practiceService.findOne(practiceId)
            documentTypeInstance.practice = practice
          }
          documentType = await this.documentTypeRepository.save(documentTypeInstance)
          updatedAttachment.attachmentMetadata.documentType = documentType
        }
        const updatedAttachmentMetaData = await this.utilsService.updateEntityManager(AttachmentMetadata, updatedAttachment.attachmentMetadata.id, { ...updatedAttachment.attachmentMetadata, ...attachmentMetadataInput }, this.attachmentMetadataRepository)
      }
      return updatedAttachment
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets attachment metadata
   * @param id 
   * @returns attachment metadata 
   */
  async getAttachmentMetadata(id: string): Promise<AttachmentMetadata> {
    try {
      return await this.attachmentMetadataRepository.findOne({ id })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes media
   * @param id 
   * @returns  
   */
  async removeMedia(id: string) {
    const attachment = await this.attachmentsRepository.findOne({ id });
    if (attachment) {
      const deletedAttachment = await this.attachmentsRepository.delete({ id })
      const deletedAttachmentMetadata = await this.attachmentMetadataRepository.delete({ id: attachment.attachmentMetadata?.id })
      if (deletedAttachment.affected) {
        return attachment.key ? await this.awsService.removeFile(attachment.key) : '';
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not delete media from remote storage',
      });
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Attachment not found',
    });
  }

  /**
   * Gets media
   * @param id 
   * @returns  
   */
  async getMedia(id: string) {
    const attachment = await this.attachmentsRepository.findOne(id);
    if (attachment) {
      return await this.awsService.getFile(attachment.key);
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Attachment not found',
    });
  }

  /**
   * Removes media by id
   * @param id 
   * @returns  
   */
  async removeMediaById(id: string) {
    return await this.attachmentsRepository.delete({ typeId: id });
  }

  /**
   * Creates attachment data
   * @param createAttachmentInput 
   * @returns  
   */
  async createAttachmentData(createAttachmentInput: CreateAttachmentInput): Promise<Attachment> {
    try {
      return await this.createAttachment(createAttachmentInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Updates attachment data
   * @param updateAttachmentInput 
   * @returns  
   */
  async updateAttachmentData(updateAttachmentInput: UpdateAttachmentInput): Promise<Attachment> {
    try {
      return await this.updateAttachmentMedia(updateAttachmentInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes attachment data
   * @param id 
   * @returns  
   */
  async removeAttachmentData(id: string) {
    try {
      return await this.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Uploads media
   * @param attachments 
   * @param uploadMedia 
   * @returns  
   */
  async uploadMedia(attachments: File, { id, type, typeId, attachmentName }: UpdateAttachmentInput) {
    const { Key, Location } = await this.awsService.uploadFile(attachments, type, typeId);
    return {
      id,
      type,
      typeId,
      key: Key,
      url: Location,
      attachmentName: attachmentName ? attachmentName : Key.split("/").pop().split('.').slice(0, -1).join(''),
    }
  }

}