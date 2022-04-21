import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//user imports
import { CreateFormTemplateInput } from '../dto/formTemplate.input';
import { FormTemplate } from '../entities/formTemplates.entity';
//service
@Injectable()
export class FormTemplateService {

  constructor(@InjectRepository(FormTemplate)
  private formTemplateRepository: Repository<FormTemplate>) { }

  //create form template
  async create(input: CreateFormTemplateInput): Promise<FormTemplate> {
    try {
      const formTemplate = this.formTemplateRepository.create(input);
      return await this.formTemplateRepository.save(formTemplate);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //get form template
  async getAll(): Promise<FormTemplate[]> {
    try {
      return await this.formTemplateRepository.find()
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
