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
import { SectionQuestionsInput } from "../dto/sectionQuestions-input.dto";
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

  async findOne(id: string): Promise<SectionQuestions> {
    return await this.sectionQuestionsRepository.findOne({ where: { id } })
  }

  async create(sectionQuestionsInput: SectionQuestionsInput): Promise<SectionQuestions> {
    const { name, section, specialId } = sectionQuestionsInput
    const sectionQuestionsInstance = this.sectionQuestionsRepository.create({ title: name, specialId })
    sectionQuestionsInstance.section = section
    sectionQuestionsInstance.sectionId = section.id

    return await this.sectionQuestionsRepository.save(sectionQuestionsInstance)
  }

}