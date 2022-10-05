import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { SocialAnswer } from "../entities/socialAnswer.entity";
//inputs
import { CreateSocialAnswerInput } from "../inputs/socialAnswer.inputs";
//services
import { UtilsService } from "src/util/utils.service";
import { QuestionService } from "./questions.service";
import { SocialHistoryService } from "./socialHistory.service";

@Injectable()
export class SocialAnswerService {
  constructor(
    @InjectRepository(SocialAnswer)
    private socialAnswerRepo: Repository<SocialAnswer>,
    private readonly utilsService: UtilsService,
    private readonly questionService: QuestionService,
    @Inject(forwardRef(() => SocialHistoryService))
    private readonly socialHistoryService: SocialHistoryService,
  ) { }


  /**
   * Creates social answer service
   * @param params 
   * @returns create 
   */
  async create(params: CreateSocialAnswerInput, socialHistoryId?: string): Promise<SocialAnswer> {
    try {
      const instance = this.socialAnswerRepo.create(params);
      const { name } = params
      if (socialHistoryId) {
        const socialHistory = await this.socialHistoryService.findOne(socialHistoryId)
        instance.socialHistory = socialHistory
        instance.socialHistoryId = socialHistoryId
      }
      const question = await this.questionService.findOne(name)
      instance.question = question;
      return await this.socialAnswerRepo.save(instance)
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
  async findOne(id: string): Promise<SocialAnswer> {
    return await this.socialAnswerRepo.findOne(id)
  }


  /**
   * Finds by social id
   * @param socialHistoryId 
   * @returns by social id 
   */
  async findBySocialId(socialHistoryId: string): Promise<SocialAnswer[]> {
    return await this.socialAnswerRepo.find({ socialHistoryId })
  }

  /**
   * Updates social answer service
   * @param params 
   * @param socialHistoryId 
   * @returns update 
   */
  async update(params: CreateSocialAnswerInput, socialHistoryId: string): Promise<SocialAnswer> {
    try {
      const socialAnswer = await this.socialAnswerRepo.findOne({ socialHistoryId, name: params?.name });
      const socialHistory = await this.socialHistoryService.findOne(socialHistoryId)
      socialAnswer.socialHistory = socialHistory
      socialAnswer.socialHistoryId = socialHistoryId
      return await this.utilsService.updateEntityManager(SocialAnswer, socialAnswer.id, params, this.socialAnswerRepo)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }
}