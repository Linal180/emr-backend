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
import { ReviewOfSystemService } from "./reviewOfSystem.service";

@Injectable()
export class AnswerResponsesService {
  constructor(
    @InjectRepository(AnswerResponses)
    private answerResponsesRepo: Repository<AnswerResponses>,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => PatientIllnessHistoryService))
    private readonly patientIllnessHistoryService: PatientIllnessHistoryService,
    @Inject(forwardRef(() => ReviewOfSystemService))
    private readonly reviewOfSystemService: ReviewOfSystemService,
    @Inject(forwardRef(() => QuestionAnswersService))
    private readonly questionAnswersService: QuestionAnswersService,
  ) { }


  /**
   * Creates social answer service
   * @param params 
   * @returns create 
   */
  async create(params: CreateAnswerResponsesInput, patientIllnessHistoryId?: string, reviewOfSystemId?: string): Promise<AnswerResponses> {
    try {
      const instance = this.answerResponsesRepo.create(params);
      const { answerId, note, value } = params
      if (patientIllnessHistoryId) {
        const patientIllnessHistory = await this.patientIllnessHistoryService.findOne(patientIllnessHistoryId)
        instance.patientIllnessHistory = patientIllnessHistory
        instance.patientIllnessHistoryId = patientIllnessHistoryId
      }

      if (reviewOfSystemId) {
        const reviewOfSystem = await this.reviewOfSystemService.findOne(reviewOfSystemId)
        instance.reviewOfSystem = reviewOfSystem
        instance.reviewOfSystemId = reviewOfSystemId
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
  async findByPatientIllnessHistoryId(patientIllnessHistoryId: string): Promise<AnswerResponses[]> {
    return await this.answerResponsesRepo.find({ patientIllnessHistoryId })
  }

  /**
   * Finds by social id
   * @param reviewOfSystemId 
   * @returns by social id 
   */
  async findByReviewOfSystemId(reviewOfSystemId: string): Promise<AnswerResponses[]> {
    return await this.answerResponsesRepo.find({ reviewOfSystemId })
  }

  /**
   * Updates social answer service
   * @param params 
   * @param patientIllnessHistoryId 
   * @returns update 
   */
  async update(params: CreateAnswerResponsesInput, patientIllnessHistoryId: string, reviewOfSystemId?: string): Promise<AnswerResponses> {
    try {
      const { answerId } = params
      let answerResponses
      if (patientIllnessHistoryId) {
        answerResponses = await this.answerResponsesRepo.findOne({ patientIllnessHistoryId, answerId });
      } else {
        answerResponses = await this.answerResponsesRepo.findOne({ reviewOfSystemId, answerId });
      }

      if (!answerResponses) {
        return await this.create(params, patientIllnessHistoryId, reviewOfSystemId)
      }
      if (patientIllnessHistoryId) {
        const patientIllnessHistory = await this.patientIllnessHistoryService.findOne(patientIllnessHistoryId)
        answerResponses.patientIllnessHistory = patientIllnessHistory
        answerResponses.patientIllnessHistoryId = patientIllnessHistoryId
      }

      if (reviewOfSystemId) {
        const reviewOfSystem = await this.reviewOfSystemService.findOne(reviewOfSystemId)
        answerResponses.reviewOfSystem = reviewOfSystem
        answerResponses.reviewOfSystemId = reviewOfSystemId
      }
      return await this.utilsService.updateEntityManager(AnswerResponses, answerResponses.id, params, this.answerResponsesRepo)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}