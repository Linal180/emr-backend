import { Any, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { CreateFormInput } from '../dto/create-form.input';
import FormInput from '../dto/form-input.dto';
import { FormPayload } from '../dto/form-payload.dto';
import { FormsPayload } from '../dto/forms-payload.dto';
import { RemoveForm, UpdateFormInput } from '../dto/update-form.input';
import { Form } from '../entities/form.entity';
import { FormElementsService } from './form-elements.service';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly formElementsService: FormElementsService
  ) { }

  /**
   * Creates form
   * @param createFormInput 
   * @returns form 
   */
  async createForm(createFormInput: CreateFormInput): Promise<Form> {
    try {
      // creating form
      const formInstance = await this.formsRepository.create({ ...createFormInput, layout: createFormInput.layout });
      const createdForm = await this.formsRepository.save(formInstance);
      //creating elements of form
      const { layout } = createFormInput
      const { tabs } = layout
      tabs?.map(({ sections }) => {
        sections?.map(async (item) => {
          await this.formElementsService.createBulk(item.fields, item.id, createdForm)
        })
      })
      return createdForm
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates form
   * @param updateFormInput 
   * @returns form 
   */
  async updateForm(updateFormInput: UpdateFormInput): Promise<Form> {
    try {
      const form = await this.utilsService.updateEntityManager(Form, updateFormInput.id, { ...updateFormInput, layout: updateFormInput?.layout }, this.formsRepository);
      const elements = await this.getFormElements(form.id);
      form.formElements = elements;
      await this.formElementsService.updateBulk(updateFormInput, form);
      return form
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all forms
   * @param formInput 
   * @returns all forms 
   */
  async findAllForms(formInput: FormInput): Promise<FormsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Form>(this.formsRepository, { ...formInput })
      return {
        pagination: {
          ...paginationResponse
        },
        forms: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
 * Gets form
 * @param id 
 * @returns form 
 */
  async getForm(id: string): Promise<FormPayload> {
    const form = await this.findOne(id);
    if (form) {
      return { form }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Form not found',
    });
  }

  /**
   * Removes form
   * @param { id } 
   */
  async removeForm({ id }: RemoveForm) {
    try {
      await this.formsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Form> {
    return await this.formsRepository.findOne(id);
  }

  /**
   * Finds by ids
   * @param servicesIds 
   * @returns by ids 
   */
  async findByIds(servicesIds: string[]): Promise<Form[]> {
    return await this.formsRepository.find({
      where: {
        id: servicesIds
      }
    });
  }

  /**
   * Gets form elements
   * @param id 
   * @returns  
   */
  async getFormElements(id: string) {
    return await this.formElementsService.getAllFormElements(id);
  }

  /**
   * Creates form template
   * @param input 
   * @returns form template 
   */
  async createFormTemplate(input: CreateFormInput): Promise<Form> {
    try {
      const formTemplate = this.formsRepository.create(input);
      return await this.formsRepository.save(formTemplate);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createPreDefinedComponent(input: CreateFormInput) {
    try {
      const preDefined = this.formsRepository.create(input);
      return await this.formsRepository.save(preDefined);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
