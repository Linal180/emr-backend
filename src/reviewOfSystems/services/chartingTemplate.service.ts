import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
//inputs
import { FindAllTemplatesInput } from "../dto/questionTemplate-input.dto";
//payloads
import { FindAllQuestionTemplatesPayload, QuestionTemplatePayload } from "../dto/questionTemplate-payload.dto";
//service
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
//constants
import { QuestionTemplate } from "../entities/questionTemplate.entity";


@Injectable()
export class ChartingTemplateService {
  constructor(
    @InjectRepository(QuestionTemplate)
    private questionTemplateRepository: Repository<QuestionTemplate>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Fetchs all
   * @param params 
   * @returns all 
   */
  async fetchAll(params: FindAllTemplatesInput): Promise<FindAllQuestionTemplatesPayload> {
    try {
      const { paginationOptions, searchString } = params
      const [first] = searchString ? searchString.split(' ') : ''
      const response = await this.paginationService.willPaginate<QuestionTemplate>(this.questionTemplateRepository, { ...params, associatedTo: 'QuestionTemplate', associatedToField: { columnValue: first, columnName: 'name', filterType: 'stringFilter' } });
      const { data: templates, ...pagination } = response
      return { templates, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(templateId: string): Promise<QuestionTemplatePayload> {
    try {
      const template = await this.questionTemplateRepository.findOne({ where: { id: templateId } })
      return { template }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}