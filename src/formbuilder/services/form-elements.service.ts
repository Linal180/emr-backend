import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user imports
import { FormElement } from '../entities/form-elements.entity';
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { FormElementInputs } from "../dto/form-element.input";
//service
@Injectable()
export class FormElementsService {
    constructor(
        @InjectRepository(FormElement)
        private formElementRepository: Repository<FormElement>,
        private readonly paginationService: PaginationService,
        private readonly utilsService: UtilsService,
    ) { }

    //create form element
    async create(inputs: FormElementInputs[]) {
        try {
            const data = await this.formElementRepository.create(inputs);
            return await this.formElementRepository.save(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    

    //create fields in bulk

    async createBulk(inputs: FormElementInputs[], id: string) {
        try {
            const elements = inputs.map((item) => ({ ...item, sectionId: id }));
            return await this.create(elements)
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}