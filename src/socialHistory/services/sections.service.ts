import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { Sections } from "../entities/sections.entity";
//inputs
import { FindAllSectionsInput } from "../inputs/sections.input";
//payloads
import { FindAllSectionsPayload } from "../payloads/sections.payload";
//service
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";
//constants
import { SECTION_SPECIAL_TYPE } from "src/lib/constants";


@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Sections)
    private sectionRepo: Repository<Sections>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Fetchs all
   * @param params 
   * @returns all 
   */
  async fetchAll(params: FindAllSectionsInput): Promise<FindAllSectionsPayload> {
    try {
      const { paginationOptions } = params
      const response = await this.paginationService.willPaginate<Sections>(this.sectionRepo, {
        paginationOptions, specialSectionId: SECTION_SPECIAL_TYPE
      });
      const { data: sections, ...pagination } = response
      return { sections, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}