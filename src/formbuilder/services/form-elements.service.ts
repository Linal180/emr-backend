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

  //create form elements
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

  //create fields in bulk

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

  //get all elements
  async getAll() {
    try {
      return await this.formElementRepository.find()
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //get all elements of a form 
  async getAllFormElements(id: string) {
    const elements = await this.formElementRepository.find({
      where: {
        form: id
      }
    })
    return elements
  }

  //update form element
  async update(inputs: UpdateElementsInputs, id: string) {
    try {
      const { placeholder, errorMsg, required, name, defaultValue } = inputs;
      const data = { placeholder, defaultValue, required, errorMsg, name };
      return await this.utilsService.updateEntityManager(FormElement, id, data, this.formElementRepository);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //find element by field id
  async getElementbyFieldId(id: string) {
    return await this.formElementRepository.findOne({
      where: {
        fieldId: id
      }
    })
  }

  //update or create element
  async updateCreateElement(input: FormElementInputs, sectionId: string, form: Form) {
    const ele = await this.getElementbyFieldId(input.fieldId);
    if (ele) {
      return await this.update(input, ele.id)
    }
    else {
      return await this.create({ ...input, sectionId }, form)
    }
  }

  //update in bulk
  async updateBulk(inputElements: UpdateFormInput, form: Form) {
    const { layout } = inputElements;
    const { sections } = layout
    const elements = Promise.all( sections?.map(async (item) => {
      const { fields, id } = item
      const fielditem = Promise.all(fields?.map(async (ele) => {
        const element = await this.getElementbyFieldId(ele.fieldId);
        if (element) {
          return await this.update(ele, element.id)
        }
        else {
          return await this.create({ ...ele, sectionId: id }, form)
        }
      }))
      return fielditem
    }))
    return elements;
  }
}