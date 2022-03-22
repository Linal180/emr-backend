import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { In, Repository } from 'typeorm';
import { CreateFormInput } from '../dto/create-form.input';
import FormInput from '../dto/form-input.dto';
import { FormPayload } from '../dto/form-payload.dto';
import { FormsPayload } from '../dto/forms-payload.dto';
import { RemoveForm, UpdateFormInput } from '../dto/update-form.input';
import { Form } from '../entities/form.entity';
import { FormElementsService } from './form-elements.service'

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
      const formInstance = await this.formsRepository.create({ ...createFormInput, layout: JSON.stringify(createFormInput.layout) });
      let elements = [];
      createFormInput?.layout?.sections?.map(async (item, index) => {
        elements[index] = await this.formElementsService.createBulk(item.fields, item.id)
      })

      // createFormInput?.layout?.sections
      //saving form

      formInstance.formElements= elements?.length > 0 ? elements : []

      return await this.formsRepository.save(formInstance);
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
      return await this.utilsService.updateEntityManager(Form, updateFormInput.id, { ...updateFormInput, layout: JSON.stringify(updateFormInput?.layout) }, this.formsRepository)
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
      const paginationResponse = await this.paginationService.willPaginate<Form>(this.formsRepository, formInput)
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
        id: In(servicesIds)
      }
    });
  }

}
