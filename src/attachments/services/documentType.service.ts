import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { Repository } from 'typeorm';
import DocumentTypeInput from '../dto/documentType-input.dto';
import { DocumentTypePayload, DocumentTypesPayload } from '../dto/documentTypes-payload.dto';
import { DocumentType } from '../entities/documentType.entity';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private documentTypeRepository: Repository<DocumentType>,
    private readonly paginationService: PaginationService,
  ) { }

  async fetchAllDocumentTypes(documentTypeInput: DocumentTypeInput): Promise<DocumentTypesPayload> {
    const paginationResponse = await this.paginationService.willPaginate<DocumentType>(this.documentTypeRepository, documentTypeInput)
    return {
      pagination: {
        ...paginationResponse
      },
      documentTypes: paginationResponse.data,
    }
  }

  async fetchDocumentType(id: string): Promise<DocumentTypePayload> {
    return {
      documentType: await this.documentTypeRepository.findOne({ id })
    }
  }

  async fetchDocumentTypeByName(name: string): Promise<DocumentTypePayload> {
    return {
      documentType: await this.documentTypeRepository.findOne({ type: name })
    }
  }
}
