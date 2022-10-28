import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//entity
import { UpFrontPayment } from "../entities/upFrontPayment.entity";
import { UpFrontPaymentType } from "../entities/upFrontPaymentType.entity";
//inputs
import { UpFrontPaymentInput } from "../dto/upFrontPayment-input.dto";
import { UtilsService } from "src/util/utils.service";

@Injectable()
export class UpFrontPaymentService {
  constructor(
    @InjectRepository(UpFrontPayment)
    private upFrontPaymentRepo: Repository<UpFrontPayment>,
    @InjectRepository(UpFrontPaymentType)
    private upFrontPaymentTypeRepo: Repository<UpFrontPaymentType>,
    private readonly utilsService: UtilsService
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


  async fetchUpFrontPaymentByAppointmentId(appointmentId: string): Promise<UpFrontPayment> {
    return await this.upFrontPaymentRepo.findOne({
      appointmentId
    })
  }

  async fetchUpFrontPaymentTypes(upFrontPaymentId: string): Promise<UpFrontPaymentType[]> {
    if (upFrontPaymentId) {
      return await this.upFrontPaymentTypeRepo.find({
        upFrontPaymentId
      })
    }
  }
}