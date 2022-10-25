import { Repository } from "typeorm";
import { forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { PhysicalExam } from "../entities/physicalExam.entity";
//inputs
import { CreatePhysicalExamInput, PhysicalExamInput } from "../dto/physicalExam-input.dto";
//services
import { PatientService } from "src/patients/services/patient.service";
import { AnswerResponsesService } from "./answerResponses.service";
import { AppointmentService } from "src/appointments/services/appointment.service";


@Injectable()
export class PhysicalExamService {
  constructor(
    @InjectRepository(PhysicalExam)
    private physicalExamRepo: Repository<PhysicalExam>,
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
  async findOneByAppointmentId(appointmentId: string): Promise<PhysicalExam> {
    try {
      return await this.physicalExamRepo.findOne({ appointmentId })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findPatientLatestPhysicalExam(physicalExamInput: PhysicalExamInput): Promise<PhysicalExam> {
    try {
      const { appointmentId, patientId } = physicalExamInput
      if (appointmentId) {
        return this.findOneByAppointmentId(appointmentId)
      }
      const allHPI = await this.physicalExamRepo.find({ patientId })
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
  async findOne(id: string): Promise<PhysicalExam> {
    return await this.physicalExamRepo.findOne(id)
  }


  /**
   * Creates or update
   * @param params 
   * @returns or update 
   */
  async createOrUpdate(params: CreatePhysicalExamInput): Promise<PhysicalExam> {
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
        const physicalExamInstance = this.physicalExamRepo.create({ patientId, templateIds });

        //associate patient
        physicalExamInstance.patient = patient
        physicalExamInstance.patientId = patient.id

        //associate appointment
        physicalExamInstance.appointment = appointment
        physicalExamInstance.appointmentId = appointment.id

        //save patient social history
        const physicalExam = await this.physicalExamRepo.save(physicalExamInstance);


        await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer;

          //create social history answer 
          const answerResponsesInstance = await this.answerResponsesService.create(rest, undefined, undefined, physicalExam?.id)
        }))

        return physicalExam
      } else {
        const physicalExamInstance = await this.findOne(id);
        if (!physicalExamInstance) {
          throw new Error("Patient Physical History Not Found");
        }

        const answerResponsesInstances = await Promise.all(answerResponses?.map(async (answer) => {
          const { ...rest } = answer
          const answerInstance = await this.answerResponsesService.update(rest, undefined, undefined, id);
          return answerInstance
        }))

        physicalExamInstance.answers = answerResponsesInstances
        physicalExamInstance.patient = patient
        physicalExamInstance.patientId = patient?.id

        physicalExamInstance.appointment = appointment
        physicalExamInstance.appointmentId = appointment.id

        const socialAnswerIns = await this.physicalExamRepo.save({ ...physicalExamInstance, templateIds })
        return socialAnswerIns
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}