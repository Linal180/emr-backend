import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entities
import { SocialDependentAnswer } from "../entities/socialDependentAnswer.entity";
//inputs
import { SocialDependentAnswerInput } from "../inputs/socialDependentAnswer.input";
//services
import { UtilsService } from "src/util/utils.service";
import { SocialAnswerService } from "./socialAnswer.service";

@Injectable()
export class SocialDependentAnswerService {
  constructor(
    @InjectRepository(SocialDependentAnswer)
    private socialDependentAnswerRepo: Repository<SocialDependentAnswer>,
    private readonly utilsService: UtilsService,
    private readonly socialAnswerService: SocialAnswerService,
  ) { }


  /**
   * Creates social answer service
   * @param params 
   * @returns create 
   */
  async create(params: SocialDependentAnswerInput, socialAnswerId?: string): Promise<SocialDependentAnswer> {
    try {
      const instance = this.socialDependentAnswerRepo.create({ ...params });
      if (socialAnswerId) {
        const socialAnswer = await this.socialAnswerService.findOne(socialAnswerId);
        instance.socialAnswer = socialAnswer
        instance.socialAnswerId = socialAnswer?.id
      }
      return await this.socialDependentAnswerRepo.save(instance)

    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates social dependent answer service
   * @param params 
   * @param socialAnswerId 
   * @returns update 
   */
  async update(params: SocialDependentAnswerInput, socialAnswerId: string): Promise<SocialDependentAnswer> {
    try {
      const socialDependentAnswer = await this.socialDependentAnswerRepo.findOne({ socialAnswerId, name: params?.name });
      const socialAnswer = await this.socialAnswerService.findOne(socialAnswerId);
      socialDependentAnswer.socialAnswer = socialAnswer
      socialDependentAnswer.socialAnswerId = socialAnswerId;
      return await this.utilsService.updateEntityManager(SocialDependentAnswer, socialAnswer.id, params, this.socialDependentAnswerRepo)

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds by social answer id
   * @param socialAnswerId 
   * @returns by social answer id 
   */
  async findBySocialAnswerId(socialAnswerId: string): Promise<SocialDependentAnswer[]> {
    return await this.socialDependentAnswerRepo.find({ socialAnswerId })
  }
}