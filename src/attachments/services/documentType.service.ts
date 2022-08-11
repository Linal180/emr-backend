import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//services
import { PracticeService } from 'src/practice/practice.service';
import { PaginationService } from 'src/pagination/pagination.service';
//inputs
import DocumentTypeInput, { CreateDocumentTypeInput } from '../dto/documentType-input.dto';
//payloads
import { DocumentTypePayload, DocumentTypesPayload } from '../dto/documentTypes-payload.dto';
//entities
import { DocumentType } from '../entities/documentType.entity';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
    @Inject(forwardRef(() => PracticeService))
    private readonly practiceService: PracticeService,
    private readonly paginationService: PaginationService,
  ) { }


  /**
   * Fetchs all document types
   * @param documentTypeInput 
   * @returns all document types 
   */
  async fetchAllDocumentTypes(documentTypeInput: DocumentTypeInput): Promise<DocumentTypesPayload> {
    const paginationResponse = await this.paginationService.willPaginate<DocumentType>(this.documentTypeRepository, documentTypeInput)
    return {
      pagination: {
        ...paginationResponse
      },
      documentTypes: paginationResponse.data,
    }
  }


  /**
   * Fetchs document type
   * @param id 
   * @returns document type 
   */
  async fetchDocumentType(id: string): Promise<DocumentTypePayload> {
    return {
      documentType: await this.documentTypeRepository.findOne({ id })
    }
  }

  /**
   * Fetchs document type by name
   * @param name 
   * @returns document type by name 
   */
  async fetchDocumentTypeByName(name: string): Promise<DocumentTypePayload> {
    return {
      documentType: await this.documentTypeRepository.findOne({ type: name })
    }
  }

  /**
   * Finds one by id
   * @param id 
   * @returns one by id 
   */
  async findOneById(id: string): Promise<DocumentType> {
    return await this.documentTypeRepository.findOne(id)
  }


  /**
   * Creates document types service
   * @param params 
   * @returns create 
   */
  async create(params: CreateDocumentTypeInput): Promise<DocumentType> {
    try {
      const { practiceId } = params
      const documentTypeInstance = this.documentTypeRepository.create(params);
      if (practiceId) {
        const practice = await this.practiceService.findOne(practiceId)
        documentTypeInstance.practice = practice
      }
      return await this.documentTypeRepository.save(documentTypeInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
