import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { Attachment } from "../entities/attachment.entity";
import { AttachmentMetadata } from "../entities/attachmentMetadata.entity";
//inputs
import { CreateAttachmentMetaDataInput } from "../dto/create-attachment-metaData.input";
//services
import { UtilsService } from "src/util/utils.service";
import { DocumentTypesService } from "./documentType.service";
import { UpdateAttachmentMetaDataInput } from "../dto/update-attachment-metaData.input copy";

@Injectable()
export class AttachmentMetaDataService {
  constructor(@InjectRepository(AttachmentMetadata)
  private attachmentMetadataRepository: Repository<AttachmentMetadata>,
    private readonly documentTypeService: DocumentTypesService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Removes attachments service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<AttachmentMetadata> {
    try {
      const metaData = await this.findOneById(id);
      await this.attachmentMetadataRepository.delete(metaData);
      return metaData
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }

  /**
   * Finds by id
   * @param id 
   * @returns by id 
   */
  async findOneById(id: string): Promise<AttachmentMetadata> {
    return await this.attachmentMetadataRepository.findOne(id)
  }


  /**
   * Creates attachment meta data service
   * @param params 
   * @returns create 
   */
  async create(params: CreateAttachmentMetaDataInput): Promise<AttachmentMetadata> {
    try {
      const { documentTypeId, documentTypeName, practiceId } = params
      const attachmentMetadata = this.attachmentMetadataRepository.create(params)
      let documentType
      if (documentTypeId) {
        documentType = await this.documentTypeService.findOneById(documentTypeId);
        attachmentMetadata.documentType = documentType;
      } else if (documentTypeName) {
        const documentType = await this.documentTypeService.create({ type: documentTypeName, practiceId });
        attachmentMetadata.documentType = documentType;
      }
      return await this.attachmentMetadataRepository.save(attachmentMetadata);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates attachment meta data service
   * @param id 
   * @param params 
   * @returns update 
   */
  async update(id: string, params: UpdateAttachmentMetaDataInput): Promise<AttachmentMetadata> {
    try {
      return await this.utilsService.updateEntityManager(AttachmentMetadata, id, { ...params.attachmentMetaData, ...params.attachmentInput, ...params }, this.attachmentMetadataRepository)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}