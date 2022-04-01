import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user imports
import { FormElement } from '../entities/form-elements.entity';
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { FormElementInputs, CreateElementInputs, UpdateElementsInputs } from "../dto/form-element.input";
import { ElementService } from "./element.service";
import { Form } from "../entities/form.entity";
import { UpdateFormInput } from "../dto/update-form.input";
//service
@Injectable()
export class FormElementsService {
  constructor(
    @InjectRepository(FormElement)
    private formElementRepository: Repository<FormElement>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly elementService: ElementService
  ) { }

  /**
   * Creates form elements service
   * @param inputs 
   * @param form 
   * @returns  
   */
  async create(inputs: CreateElementInputs, form: Form) {
    try {
      const data = this.formElementRepository.create(inputs);
      const element = await this.elementService.getByType({ type: inputs.type })
      data.element = element;
      data.form = form;
      return await this.formElementRepository.save(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Creates bulk
   * @param inputs 
   * @param id 
   * @param form 
   * @returns  
   */
  async createBulk(inputs: FormElementInputs[], id: string, form: Form) {
    try {
      const elements = inputs?.map(async (item) => {
        return await this.create({ ...item, sectionId: id }, form)
      });
      return elements
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets all
   * @returns  
   */
  async getAll() {
    try {
      return await this.formElementRepository.find()
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets all form elements
   * @param id 
   * @returns  
   */
  async getAllFormElements(id: string) {
    const elements = await this.formElementRepository.find({
      where: {
        form: id
      }
    })
    return elements
  }

  
  /**
   * Updates form elements service
   * @param inputs 
   * @param id 
   * @returns  
   */
  async update(inputs: UpdateElementsInputs, id: string) {
    try {
      const { placeholder, errorMsg, required, name, defaultValue } = inputs;
      const data = { placeholder, defaultValue, required, errorMsg, name };
      return await this.utilsService.updateEntityManager(FormElement, id, data, this.formElementRepository);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets elementby field id
   * @param id 
   * @returns  
   */
  async getElementbyFieldId(id: string) {
    return await this.formElementRepository.findOne({
      where: {
        fieldId: id
      }
    })
  }

  /**
   * Updates bulk
   * @param inputElements 
   * @param form 
   */
  async updateBulk(inputElements: UpdateFormInput, form: Form) {
    const { layout } = inputElements;
    const { sections } = layout;
    Promise.all(sections?.map(async (item) => {
      const { fields, id } = item
      const oldFieldsForUpdate = form?.formElements?.filter((page1) => fields.some(page2 => page1.fieldId === page2.fieldId))
      const oldFieldsForDelete = form?.formElements?.filter((page1) => !fields.some(page2 => page1.fieldId === page2.fieldId))
      const newFields = fields?.filter((page1) => !form?.formElements.some(page2 => page1.fieldId === page2.fieldId))
      const newFieldsForUpdate = fields?.filter((page1) => form?.formElements?.some(page2 => page1.fieldId === page2.fieldId))
      oldFieldsForDelete?.map(async (field) => {
        if (!field?.isDeleted) await this.del(field.id)
      })
      newFields?.map(async (field) => {
        await this.create({ ...field, sectionId: id }, form)
      })
      newFieldsForUpdate?.map(async (field) => {
        const element = oldFieldsForUpdate?.find((ele) => ele.fieldId === field.fieldId);
        if (element) await this.update(field, element.id)
      })
    }))
  }

  /**
   * Dels form elements service
   * @param id 
   * @returns  
   */
  async del(id: string) {
    try {
      return await this.utilsService.updateEntityManager(FormElement, id, { isDeleted: true }, this.formElementRepository);
    } catch (error) {
      throw new InternalServerErrorException(error)

    }
  }
}