import { Repository } from "typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { ReviewOfSystem } from "../entities/reviewOfSystem.entity";
//inputs
import { CreateReviewOfSystemInput, ReviewOfSystemInput } from "../dto/reviewOfSystem-input.dto";
//services
import { PatientService } from "src/patients/services/patient.service";
import { AnswerResponsesService } from "./answerResponses.service";
import { AppointmentService } from "src/appointments/services/appointment.service";
import { UpdateNotes } from "../dto/patientIllnessHistory-input.dto";


@Injectable()
export class ReviewOfSystemService {
  constructor(
    @InjectRepository(ReviewOfSystem)
    private reviewOfSystemRepo: Repository<ReviewOfSystem>,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
    @Inject(forwardRef(() => AnswerResponsesService))
    private readonly answerResponsesService: AnswerResponsesService,
  ) { }


  /**
   * Finds one by patient id
   * @param patientId 
   * @returns one by patient id 
   */
  async findOneByAppointmentId(appointmentId: string): Promise<ReviewOfSystem> {
    try {
      return await this.reviewOfSystemRepo.findOne({ appointmentId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findPatientLatestRos(reviewOfSystemInput: ReviewOfSystemInput): Promise<ReviewOfSystem> {
    try {
      const { patientId, appointmentId } = reviewOfSystemInput
      if (appointmentId) {
        return this.findOneByAppointmentId(appointmentId)
      }
      const allRos = await this.reviewOfSystemRepo.find({ patientId })
      return allRos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<ReviewOfSystem> {
    return await this.reviewOfSystemRepo.findOne(id)
  }

  async updateNotes(updateNotes: UpdateNotes): Promise<ReviewOfSystem> {
    const { appointmentId, patientId, id, notes } = updateNotes
    if (id) {
      const reviewOfSystemInstance = await this.reviewOfSystemRepo.findOne(id)
      reviewOfSystemInstance.notes = notes
      return await this.reviewOfSystemRepo.save(reviewOfSystemInstance)
    } else {
      const PatientPayload = await this.patientService.GetPatient(patientId);
      const appointment = await this.appointmentService.findOne(appointmentId);
      const { patient } = PatientPayload;

      const reviewOfSystemInstance = await this.reviewOfSystemRepo.create({
        notes
      })

      reviewOfSystemInstance.patient = patient
      reviewOfSystemInstance.patientId = patient.id

      //associate appointment
      reviewOfSystemInstance.appointment = appointment
      reviewOfSystemInstance.appointmentId = appointment.id

      return await this.reviewOfSystemRepo.save(reviewOfSystemInstance)
    }
  }


  /**
   * Creates or update
   * @param params 
   * @returns or update 
   */
  async createOrUpdate(params: CreateReviewOfSystemInput): Promise<ReviewOfSystem> {
    try {
      const { id, patientId, appointmentId, answerResponses, templateIds } = params;

      //fetch patient
      const PatientPayload = await this.patientService.GetPatient(patientId);
      const appointment = await this.appointmentService.findOne(appointmentId);
      const { patient } = PatientPayload;
      if (!patient) {
        throw new Error("Patient Not Found");
      }
      if (!id) {
        //create social history
        const reviewOfSystemInstance = this.reviewOfSystemRepo.create({ patientId, templateIds });

        //associate patient
        reviewOfSystemInstance.patient = patient
        reviewOfSystemInstance.patientId = patient.id

        //associate appointment
        reviewOfSystemInstance.appointment = appointment
        reviewOfSystemInstance.appointmentId = appointment.id

        //save patient social history
        const reviewOfSystem = await this.reviewOfSystemRepo.save(reviewOfSystemInstance);


        await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer;

          //create social history answer 
          const answerResponsesInstance = await this.answerResponsesService.create(rest, undefined, reviewOfSystem?.id)
        }))

        return reviewOfSystem
      } else {
        const reviewOfSystemInstance = await this.findOne(id);
        if (!reviewOfSystemInstance) {
          throw new Error("Patient Social history Not Found");
        }

        const answerResponsesInstances = await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer
          const answerInstance = await this.answerResponsesService.update(rest, undefined, id);
          return answerInstance
        }))

        reviewOfSystemInstance.answers = answerResponsesInstances
        reviewOfSystemInstance.patient = patient
        reviewOfSystemInstance.patientId = patient?.id

        reviewOfSystemInstance.appointment = appointment
        reviewOfSystemInstance.appointmentId = appointment.id

        const socialAnswerIns = await this.reviewOfSystemRepo.save({ ...reviewOfSystemInstance, templateIds })
        return socialAnswerIns
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}