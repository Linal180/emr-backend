import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entities
import { AnswerResponses } from "../entities/answerResponses.entity";
//inputs
import { CreateAnswerResponsesInput } from "../dto/answerResponses-input.dto";
//services
import { UtilsService } from "src/util/utils.service";
import { PatientIllnessHistoryService } from "./patientIllnessHistory.service";
import { QuestionAnswersService } from "./questionAnswers.service";

@Injectable()
export class AnswerResponsesService {
  constructor(
    @InjectRepository(AnswerResponses)
    private answerResponsesRepo: Repository<AnswerResponses>,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => PatientIllnessHistoryService))
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    @Inject(forwardRef(() => QuestionAnswersService))
    private readonly questionAnswersService: QuestionAnswersService,
  ) { }


  /**
   * Creates social answer service
   * @param params 
   * @returns create 
   */
  async create(params: CreateAnswerResponsesInput, patientIllnessHistoryId?: string): Promise<AnswerResponses> {
    try {
      const instance = this.answerResponsesRepo.create(params);
      const { answerId, note, value } = params
      if (patientIllnessHistoryId) {
        const patientIllnessHistory = await this.patientIllnessHistoryService.findOne(patientIllnessHistoryId)
        instance.patientIllnessHistory = patientIllnessHistory
        instance.patientIllnessHistoryId = patientIllnessHistoryId
      }

      if (answerId) {
        const questionAnswer = await this.questionAnswersService.findOne(answerId)
        instance.answer = questionAnswer
      }
      return await this.answerResponsesRepo.save(instance)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<AnswerResponses> {
    return await this.answerResponsesRepo.findOne(id)
  }


  /**
   * Finds by social id
   * @param patientIllnessHistoryId 
   * @returns by social id 
   */
  async findBySocialId(patientIllnessHistoryId: string): Promise<AnswerResponses[]> {
    return await this.answerResponsesRepo.find({ patientIllnessHistoryId })
  }

  /**
   * Updates social answer service
   * @param params 
   * @param patientIllnessHistoryId 
   * @returns update 
   */
  async update(params: CreateAnswerResponsesInput, patientIllnessHistoryId: string): Promise<AnswerResponses> {
    try {
      const { answerId } = params
      const answerResponses = await this.answerResponsesRepo.findOne({ patientIllnessHistoryId, answerId });
      const patientIllnessHistory = await this.patientIllnessHistoryService.findOne(patientIllnessHistoryId)
      answerResponses.patientIllnessHistory = patientIllnessHistory
      answerResponses.patientIllnessHistoryId = patientIllnessHistoryId
      return await this.utilsService.updateEntityManager(AnswerResponses, answerResponses.id, params, this.answerResponsesRepo)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}