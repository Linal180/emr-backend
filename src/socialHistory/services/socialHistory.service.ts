import { Repository } from "typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { SocialHistory } from "../entities/socialHistory.entity";
//inputs
import { CreatePatientSocialHistoryInput } from "../inputs/socialHistory.inputs";
//services
import { SocialAnswerService } from "./socialAnswer.service";
import { PatientService } from "src/patients/services/patient.service";
import { SocialDependentAnswerService } from "./socialDependentAnswer.service";


@Injectable()
export class SocialHistoryService {
  constructor(
    @InjectRepository(SocialHistory)
    private socialHistoryRepo: Repository<SocialHistory>,
    private readonly patientService: PatientService,
    @Inject(forwardRef(() => SocialAnswerService))
    private readonly socialAnswerService: SocialAnswerService,
    @Inject(forwardRef(() => SocialDependentAnswerService))
    private readonly socialDependentAnswerService: SocialDependentAnswerService,
  ) { }


  /**
   * Finds one by patient id
   * @param patientId 
   * @returns one by patient id 
   */
  async findOneByPatientId(patientId: string): Promise<SocialHistory> {
    try {
      return await this.socialHistoryRepo.findOne({ patientId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<SocialHistory> {
    return await this.socialHistoryRepo.findOne(id)
  }


  /**
   * Creates or update
   * @param params 
   * @returns or update 
   */
  async createOrUpdate(params: CreatePatientSocialHistoryInput): Promise<SocialHistory> {
    try {
      
      const { id, patientId, socialAnswer } = params;
      //fetch patient
      const PatientPayload = await this.patientService.GetPatient(patientId);
      const { patient } = PatientPayload;
      if (!patient) {
        throw new Error("Patient Not Found");
      }
      if (!id) {
        //create social history
        const socialHistoryInstance = this.socialHistoryRepo.create({ patientId });

        //associate patient
        socialHistoryInstance.patient = patient

        //save patient social history
        const socialHistory = await this.socialHistoryRepo.save(socialHistoryInstance);

        if (socialAnswer) {
          for (let index = 0; index < socialAnswer.length; index++) {
            const element = socialAnswer[index];
            const { socialDependentAnswer, ...rest } = element;
            //create social history answer 
            const socialAnswerInstance = await this.socialAnswerService.create(rest, socialHistory?.id);
            
            //create social history dependent answer 
            if (socialDependentAnswer) {
              await Promise.all(socialDependentAnswer?.map(async (dependentAnswer) => {
                
                return await this.socialDependentAnswerService.create(dependentAnswer, socialAnswerInstance?.id)
              }))
            }
          }
        }

        return socialHistory
      } else {
        const socialHistoryInstance = await this.findOne(id);
        if (!socialHistoryInstance) {
          throw new Error("Patient Social history Not Found");
        }

        if (socialAnswer) {
          for (let index = 0; index < socialAnswer.length; index++) {
            const { socialDependentAnswer, ...rest } = socialAnswer[index];
            const answerInstance = await this.socialAnswerService.update(rest, id);

            if (socialDependentAnswer?.length) {
              await Promise.all(socialDependentAnswer?.map(async (dependentAnswer) => {
                return await this.socialDependentAnswerService.update(dependentAnswer, answerInstance?.id)
              }))
            }
          }
        }

        // await Promise.all(socialAnswer?.map(async (answer) => {
        //   const { socialDependentAnswer, ...rest } = answer
        //   const answerInstance = await this.socialAnswerService.update(rest, id);
        //   if (socialDependentAnswer?.length) {
        //     await Promise.all(socialDependentAnswer?.map(async (dependentAnswer) => {
        //       return await this.socialDependentAnswerService.update(dependentAnswer, answerInstance?.id)
        //     }))
        //   }

        //   return answerInstance
        // }))

        const socialAnswerInstances = await this.socialAnswerService.findBySocialId(id);
        if (socialAnswerInstances) {
          socialHistoryInstance.socialAnswer = socialAnswerInstances
        }
        socialHistoryInstance.patient = patient
        socialHistoryInstance.patientId = patient?.id

        const socialAnswerIns = await this.socialHistoryRepo.save(socialHistoryInstance)
        return socialAnswerIns
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}