//packages block
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//entity, inputs types,
import { Scribe } from "../entities/scribe.entity";
import { CreateScribeInput, ScribeCheckInput, UpdateScribeInput } from "../dto/scribe.input";
import { AppointmentService } from "./appointment.service";

@Injectable()
export class ScribeService {
  constructor(
    @InjectRepository(Scribe) private scribeRepo: Repository<Scribe>,
    private readonly appointmentService: AppointmentService
  ) { }

  /**
   * Creates scribe service
   * @param input 
   * @returns create 
   */
  async create(input: CreateScribeInput): Promise<Scribe> {
    try {
      const { appointmentId, firstName, lastName, userId, userType } = input || {}
      const scribeInstance = this.scribeRepo.create({ firstName, lastName, userId, userType })
      const appointment = await this.appointmentService.findOne(appointmentId)
      scribeInstance.appointment = appointment

      return this.scribeRepo.save(scribeInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Updates scribe service
   * @param input 
   * @returns update 
   */
  async update(input: UpdateScribeInput): Promise<Scribe> {
    try {
      const { appointmentId, firstName, lastName, userId, userType, id } = input || {}
      const scribeInstance = await this.scribeRepo.findOne(id)
      scribeInstance.firstName = firstName
      scribeInstance.lastName = lastName
      scribeInstance.userId = userId
      scribeInstance.userType = userType

      return this.scribeRepo.save(scribeInstance)

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateScribedCheck(input: ScribeCheckInput): Promise<Scribe> {
    try {
      const { id, isScribed, appointmentId } = input || {}
      const updateInput = isScribed ? {} : { firstName: '', lastName: '', userId: '', userType: "" }
      if (id) {
        const scribeInstance = await this.scribeRepo.findOne(id)
        scribeInstance.isScribed = isScribed
        const appointment = await this.appointmentService.findOne(appointmentId)
        scribeInstance.appointment = appointment
        return await this.scribeRepo.save({ ...scribeInstance, ...updateInput })
      } else {
        const createScribeInstance = await this.scribeRepo.create({ isScribed })
        const appointment = await this.appointmentService.findOne(appointmentId)
        createScribeInstance.appointment = appointment
        return await this.scribeRepo.save(createScribeInstance)
      }

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}