import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { SectionQuestions } from "../entities/sectionQuestions.entity";
//payloads
import { SectionQuestionsPayload } from "../dto/sectionQuestions-payload.dto";
//service
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
//constants


@Injectable()
export class SectionQuestionsService {
  constructor(
    @InjectRepository(SectionQuestions)
    private sectionQuestionsRepository: Repository<SectionQuestions>,
  ) { }

  async findQuestionsBySectionId(sectionId: string): Promise<SectionQuestionsPayload> {
    try {
      const questions = await this.sectionQuestionsRepository.find({
        where: {
          sectionId
        }
      })
      return { questions }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}