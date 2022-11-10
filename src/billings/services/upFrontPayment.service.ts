import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entity
import { UpFrontPayment } from "../entities/upFrontPayment.entity";
import { UpFrontPaymentType } from "../entities/upFrontPaymentType.entity";
//inputs
import { UpFrontPaymentInput, UpfrontPreviousInput } from "../dto/upFrontPayment-input.dto";
import { UtilsService } from "src/util/utils.service";
import { AppointmentService } from "src/appointments/services/appointment.service";
import { UpFrontPaymentPayload } from "../dto/upFrontPayment-payload";

@Injectable()
export class UpFrontPaymentService {
  constructor(
    @InjectRepository(UpFrontPayment)
    private upFrontPaymentRepo: Repository<UpFrontPayment>,
    @InjectRepository(UpFrontPaymentType)
    private upFrontPaymentTypeRepo: Repository<UpFrontPaymentType>,
    private readonly utilsService: UtilsService,
    private readonly appointmentService: AppointmentService,
  ) { }

  /**
   * Creates up front payment service
   * @param params 
   * @returns create 
   */
  async create(params: UpFrontPaymentInput): Promise<UpFrontPayment> {
    try {
      const { patientId, upFrontPaymentTypes, appointmentId, ...upFrontPaymentToCreate } = params || {}
      const upFrontPayment = await this.upFrontPaymentRepo.findOne({ appointmentId })
      let upFrontPaymentInstance: UpFrontPayment
      if (upFrontPayment) {
        upFrontPaymentInstance = await this.utilsService.updateEntityManager(UpFrontPayment, upFrontPayment.id, { ...upFrontPaymentToCreate }, this.upFrontPaymentRepo)
      } else {
        upFrontPaymentInstance = await this.upFrontPaymentRepo.create({
          ...upFrontPaymentToCreate,
          appointmentId,
          patientId,
        })
      }

      if (upFrontPaymentTypes) {
        if (upFrontPayment) {
          await this.upFrontPaymentTypeRepo.delete({ upFrontPaymentId: upFrontPayment.id })
        }
        const createdUpFrontPaymentTypes = await Promise.all(upFrontPaymentTypes?.map(async (upFrontPaymentToCreate) => {
          const createdUpFrontPaymentType = await this.upFrontPaymentTypeRepo.create(upFrontPaymentToCreate)
          return await this.upFrontPaymentTypeRepo.save(createdUpFrontPaymentType)
        }))

        upFrontPaymentInstance.UpFrontPaymentTypes = createdUpFrontPaymentTypes
      }

      if (appointmentId) {
        upFrontPaymentInstance.appointmentId = appointmentId
      }

      if (patientId) {
        upFrontPaymentInstance.patientId = patientId
      }

      return await this.upFrontPaymentRepo.save(upFrontPaymentInstance)

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchUpFrontPaymentByAppointmentId(appointmentId: string): Promise<UpFrontPaymentPayload> {
    const appointment = await this.appointmentService.findOne(appointmentId)
    const pastAppointments = await this.appointmentService.findAllUpcomingAppointments({ shouldFetchPast: true, appointmentTime: appointment.scheduleStartDateTime, paginationOptions: { limit: 50, page: 1 }, patientId: appointment.patientId })
    const pastUpfrontPayments = await Promise.all(pastAppointments.appointments.map(async (appointment) => {
      const upfront = await this.upFrontPaymentRepo.findOne({ appointmentId: appointment.id }, { relations: ['UpFrontPaymentTypes'] })
      return upfront
    }))

    const filteredUpfrontPayment = pastUpfrontPayments.filter((val) => !!val)

    const accPrevious = filteredUpfrontPayment.reduce((acc, payment) => {
      const { UpFrontPaymentTypes } = payment || {}
      const { amount } = UpFrontPaymentTypes.find((type) => type.paymentType === 'Previous') || {}
      return acc += Number(amount || 0)
    }, 0)

    const upfrontPayment = await this.upFrontPaymentRepo.findOne({ appointmentId })
    return {
      upFrontPayment: upfrontPayment,
      previous: accPrevious
    }
  }

  async fetchUpFrontPaymentTypes(upFrontPaymentId: string): Promise<UpFrontPaymentType[]> {
    if (upFrontPaymentId) {
      return await this.upFrontPaymentTypeRepo.find({
        upFrontPaymentId
      })
    }
  }
}