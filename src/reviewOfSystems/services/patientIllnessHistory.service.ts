import { Repository } from "typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { PatientIllnessHistory } from "../entities/patientIllnessHistory.entity";
//inputs
import { CreatePatientIllnessHistoryInput, PatientIllnessHistoryInput, UpdateNotes } from "../dto/patientIllnessHistory-input.dto";
//services
import { PatientService } from "src/patients/services/patient.service";
import { AnswerResponsesService } from "./answerResponses.service";
import { AppointmentService } from "src/appointments/services/appointment.service";


@Injectable()
export class PatientIllnessHistoryService {
  constructor(
    @InjectRepository(PatientIllnessHistory)
    private patientIllnessHistoryRepo: Repository<PatientIllnessHistory>,
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
  async findOneByAppointmentId(appointmentId: string): Promise<PatientIllnessHistory> {
    try {
      return await this.patientIllnessHistoryRepo.findOne({ appointmentId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findPatientLatestIllnessHistory(patientIllnessHistoryInput: PatientIllnessHistoryInput): Promise<PatientIllnessHistory> {
    try {
      const { appointmentId, patientId } = patientIllnessHistoryInput
      if (appointmentId) {
        return this.findOneByAppointmentId(appointmentId)
      }
      const allHPI = await this.patientIllnessHistoryRepo.find({ patientId })
      return allHPI.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<PatientIllnessHistory> {
    return await this.patientIllnessHistoryRepo.findOne(id)
  }

  async updateNotes(updateNotes: UpdateNotes): Promise<PatientIllnessHistory> {
    const { appointmentId, patientId, id, notes } = updateNotes
    if (id) {
      const patientIllnessHistoryInstance = await this.patientIllnessHistoryRepo.findOne(id)
      patientIllnessHistoryInstance.notes = notes
      return await this.patientIllnessHistoryRepo.save(patientIllnessHistoryInstance)
    } else {
      const PatientPayload = await this.patientService.GetPatient(patientId);
      const appointment = await this.appointmentService.findOne(appointmentId);
      const { patient } = PatientPayload;

      const patientIllnessHistoryInstance = await this.patientIllnessHistoryRepo.create({
        notes
      })

      patientIllnessHistoryInstance.patient = patient
      patientIllnessHistoryInstance.patientId = patient.id

      //associate appointment
      patientIllnessHistoryInstance.appointment = appointment
      patientIllnessHistoryInstance.appointmentId = appointment.id

      return await this.patientIllnessHistoryRepo.save(patientIllnessHistoryInstance)
    }
  }


  /**
   * Creates or update
   * @param params 
   * @returns or update 
   */
  async createOrUpdate(params: CreatePatientIllnessHistoryInput): Promise<PatientIllnessHistory> {
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
        const patientIllnessHistoryInstance = this.patientIllnessHistoryRepo.create({ patientId, templateIds });

        //associate patient
        patientIllnessHistoryInstance.patient = patient
        patientIllnessHistoryInstance.patientId = patient.id

        //associate appointment
        patientIllnessHistoryInstance.appointment = appointment
        patientIllnessHistoryInstance.appointmentId = appointment.id

        //save patient social history
        const patientIllnessHistory = await this.patientIllnessHistoryRepo.save(patientIllnessHistoryInstance);


        await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer;

          //create social history answer 
          const answerResponsesInstance = await this.answerResponsesService.create(rest, patientIllnessHistory?.id)
        }))

        return patientIllnessHistory
      } else {
        const patientIllnessHistoryInstance = await this.findOne(id);
        if (!patientIllnessHistoryInstance) {
          throw new Error("Patient Social history Not Found");
        }

        const answerResponsesInstances = await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer
          const answerInstance = await this.answerResponsesService.update(rest, id);
          return answerInstance
        }))

        patientIllnessHistoryInstance.answers = answerResponsesInstances
        patientIllnessHistoryInstance.patient = patient
        patientIllnessHistoryInstance.patientId = patient?.id

        patientIllnessHistoryInstance.appointment = appointment
        patientIllnessHistoryInstance.appointmentId = appointment.id

        const socialAnswerIns = await this.patientIllnessHistoryRepo.save({ ...patientIllnessHistoryInstance, templateIds })
        return socialAnswerIns
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}