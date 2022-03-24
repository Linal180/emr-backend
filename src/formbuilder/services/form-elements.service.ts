import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user imports
import { FormElement } from '../entities/form-elements.entity';
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { FormElementInputs, CreateElementInputs } from "../dto/form-element.input";
import { ElementService } from "./element.service";
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
    async create(inputs: CreateElementInputs) {
        try {
            const data = await this.formElementRepository.create(inputs);
            const element = await this.elementService.getByType({ type: inputs.type })
            data.element = element;
            console.log('data => ', data)
            return await this.formElementRepository.save(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }



    //create fields in bulk

    async createBulk(inputs: FormElementInputs[], id: string) {
        try {
            const elements = inputs?.map(async (item) => {
                return await this.create({ ...item, sectionId: id })
            });
            return elements
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}