import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
    private readonly socialAnswerService: SocialAnswerService,
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


        await Promise.all(socialAnswer?.map(async (answer) => {
          const { socialDependentAnswer, ...rest } = answer;

          //create social history answer 
          const socialAnswerInstance = await this.socialAnswerService.create(rest, socialHistory?.id)

          await Promise.all(socialDependentAnswer?.map(async (dependentAnswer) => {
            //create social history dependent answer 
            return await this.socialDependentAnswerService.create(dependentAnswer, socialAnswerInstance?.id)
          }))
        }))

        return socialHistory
      } else {
        const socialHistoryInstance = await this.findOne(id);

        if (!socialHistoryInstance) {
          throw new Error("Patient Social history Not Found");
        }

        const socialAnswerInstances = await Promise.all(socialAnswer?.map(async (answer) => {
          const { socialDependentAnswer, ...rest } = answer
          const answerInstance = await this.socialAnswerService.update(rest, id);
          const socialDependentAnswerInstances = await Promise.all(socialDependentAnswer?.map(async (dependentAnswer) => {
            return await this.socialDependentAnswerService.update(dependentAnswer, answerInstance?.id)
          }))
          answerInstance.socialDependentAnswer = socialDependentAnswerInstances
          return answerInstance
        }))

        socialHistoryInstance.socialAnswer = socialAnswerInstances
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