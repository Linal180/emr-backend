import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
//inputs
import { FindAllTemplatesInput } from "../dto/questionTemplate-input.dto";
//payloads
import { TemplateSectionsPayload } from "../dto/templateSections-payload.dto";
//service
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
//constants
import { SECTION_SPECIAL_TYPE } from "src/lib/constants";
import { TemplateSections } from "../entities/templateSections.entity";


@Injectable()
export class TemplateSectionsService {
  constructor(
    @InjectRepository(TemplateSections)
    private templateSectionsRepository: Repository<TemplateSections>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  async findSectionsByTemplateId(templateId: string): Promise<TemplateSectionsPayload> {
    try {
      const sections = await this.templateSectionsRepository.find({
        where: {
          template: {
            id: templateId
          }
        }
      })
      return { sections }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}