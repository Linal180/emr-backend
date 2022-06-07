import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/aws/dto/file-input.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import PatientAttachmentsInput from 'src/patients/dto/patient-attachments-input.dto';
import { PatientAttachmentsPayload } from 'src/patients/dto/patients-attachments-payload.dto';
import { PracticeService } from 'src/practice/practice.service';
import { UtilsService } from 'src/util/utils.service';
import { Brackets, getConnection, Repository } from 'typeorm';
import { AwsService } from '../../aws/aws.service';
import { CreateAttachmentInput } from '../dto/create-attachment.input';
import { GetAttachmentsByLabOrder, GetAttachmentsByPolicyId, UpdateAttachmentInput, UpdateAttachmentMediaInput } from '../dto/update-attachment.input';
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
    const { labOrderNum, policyId, documentTypeId, documentTypeName, practiceId, ...attachmentInput } = createAttachmentInput
    const attachmentsResult = this.attachmentsRepository.create(attachmentInput)
    let createMetaDataParams = {}
    if (labOrderNum) {
      (createMetaDataParams as any).labOrderNum = labOrderNum
    }

    if (policyId) {
      (createMetaDataParams as any).policyId = policyId
    }

    if (documentTypeId) {
      (createMetaDataParams as any).documentTypeId = documentTypeId
    }

    if (documentTypeName) {
      (createMetaDataParams as any).documentTypeName = documentTypeName
    }

    if (Object.keys(createMetaDataParams).length) {
      const attachmentMetadata = this.attachmentMetadataRepository.create(createMetaDataParams)
      let documentType
      if (documentTypeId) {
        documentType = await this.documentTypeRepository.findOne({ id: documentTypeId })
      } else if (documentTypeName) {
        const documentTypeInstance = this.documentTypeRepository.create({ type: documentTypeName })
        if (practiceId) {
          const practice = await this.practiceService.findOne(practiceId)
          documentTypeInstance.practice = practice
        }
        documentType = await this.documentTypeRepository.save(documentTypeInstance)
      }
      attachmentMetadata.documentType = documentType
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
    const attachmentData = await this.updateAttachmentMedia(attachments)
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

  async findAttachmentsByPolicyId(getAttachmentsByPolicyId: GetAttachmentsByPolicyId): Promise<Attachment[]> {
    const { policyId, typeId } = getAttachmentsByPolicyId
    return await this.attachmentsRepository.find({
      relations: ['attachmentMetadata'],
      where: {
        attachmentMetadata: {
          policyId: policyId,
        },
        typeId
      }
    });
  }

  /**
   * Updates attachment media
   * @param updateAttachmentInput 
   * @returns attachment media 
   */
  async updateAttachmentMedia(updateAttachmentInput: UpdateAttachmentInput): Promise<Attachment> {
    try {
      return await this.utilsService.updateEntityManager(Attachment, updateAttachmentInput.id, updateAttachmentInput, this.attachmentsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

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
    const attachment = await this.attachmentsRepository.findOne(id);
    if (attachment) {
      const deletedAttachment = await this.attachmentsRepository.delete(id)
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
      attachmentName: attachmentName ? attachmentName : Key.split("/").pop().split('.').slice(0, -1).join('')
    }
  }
}
