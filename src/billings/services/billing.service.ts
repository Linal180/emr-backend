import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { AppointmentStatus } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PatientService } from 'src/patients/services/patient.service';
import { Connection, Repository } from 'typeorm';
import BillingInput from '../dto/billing-input.dto';
import { Billing } from '../entities/billing.entity';
import { Code } from '../entities/code.entity';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly connection: Connection,
    private readonly patientService: PatientService,
    private readonly appointmentService: AppointmentService,
  ) { }


  async create(createBillingInput: BillingInput): Promise<Billing> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { codes, patientId, appointmentId, ...billingInfoToCreate } = createBillingInput
      //creating policy
      const billingInstance = this.billingRepository.create({ ...billingInfoToCreate })

      if (patientId) {
        const patient = await this.patientService.findOne(patientId)
        billingInstance.patient = patient
      }

      if (appointmentId) {
        const appointment = await this.appointmentService.findOne(appointmentId)
        billingInstance.appointment = appointment
      }
      const billing = await this.billingRepository.save(billingInstance);

      //associate codes
      if (codes) {
        const createdCodes = await Promise.all(codes?.map(async (codeToCreate) => {
          const createdCode = await this.codeRepository.create(codeToCreate)
          return await this.codeRepository.save(createdCode)
        }))

        billing.codes = createdCodes
      }

      const createdBilling = await this.billingRepository.save(billing);
      if (createdBilling.id) {
        this.appointmentService.updateAppointment({
          id: appointmentId,
          status: AppointmentStatus.COMPLETED,
          checkedOutAt: moment().toISOString()
        })
      }
      await queryRunner.commitTransaction();
      return createdBilling
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async fetchBillingDetailsByAppointmentId(appointmentId: string): Promise<Billing> {
    return this.billingRepository.findOne({
      appointmentId
    })
  } u
}
