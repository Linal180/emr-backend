import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { QuestionAnswers } from "../entities/questionAnswers.entity";
//payloads
import { QuestionAnswersPayload } from "../dto/questionAnswers-payload.dto";
//service
//constants


@Injectable()
export class QuestionAnswersService {
  constructor(
    @InjectRepository(QuestionAnswers)
    private questionAnswerRepository: Repository<QuestionAnswers>,
  ) { }

  async findAnswersByQuestionId(questionId: string): Promise<QuestionAnswersPayload> {
    try {
      const answers = await this.questionAnswerRepository.find({
        where: {
          questionsId: questionId
        }
      })
      return { answers }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id): Promise<QuestionAnswers> {
    return await this.questionAnswerRepository.findOne({ where: { id } })
  }
}