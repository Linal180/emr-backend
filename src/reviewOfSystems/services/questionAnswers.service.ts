import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { QuestionAnswers } from "../entities/questionAnswers.entity";
//payloads
import { QuestionAnswersPayload } from "../dto/questionAnswers-payload.dto";
import { SectionQuestionAnswersInput } from "../dto/questionAnswers-input.dto";
import { ANSWER_TYPE, QuestionType } from "src/lib/constants";
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

  getMappedAnswerType(answerType: string) {
    switch (answerType) {
      case 'normal':
        return ANSWER_TYPE.NORMAL
      case 'abnormal':
        return ANSWER_TYPE.ABNORMAL
      case 'neutral':
        return ANSWER_TYPE.NEUTRAL
    }
  }

  async create(sectionQuestionAnswersInput: SectionQuestionAnswersInput): Promise<QuestionAnswers> {
    const { title, answerType, question, specialId, options } = sectionQuestionAnswersInput
    const mappedTitle = title.replace('{{FILL}}', 'fill')
    const mappedAnswerType = this.getMappedAnswerType(answerType)
    const mappedQuestionType = (options?.length && mappedTitle.includes('fill')) ? QuestionType.SELECT : mappedTitle.includes('fill') ? QuestionType.NUMBER : ''
    const transformedOptions = options?.map((option) => {
      return {
        id: option,
        name: option
      }
    })
    const questionAnswerInstance = this.questionAnswerRepository.create({
      name: mappedTitle, specialId, answerType: mappedAnswerType, questionType: mappedQuestionType, options: transformedOptions
    })
    questionAnswerInstance.questions = question
    questionAnswerInstance.questionsId = question.id

    return await this.questionAnswerRepository.save(questionAnswerInstance)
  }
}