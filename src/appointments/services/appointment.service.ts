//packages block
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Brackets, Connection, getConnection, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, ObjectLiteral, Repository } from 'typeorm';
import { ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//entities, services, inputs types, enums
import { createToken } from 'src/lib/helper';
import { ContractService } from './contract.service';
import { UtilsService } from 'src/util/utils.service';
import { MailerService } from 'src/mailer/mailer.service';
import { AppointmentInput, UpComingAppointmentsInput } from '../dto/appointment-input.dto';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { GetSlots } from 'src/providers/dto/update-schedule.input';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Service } from '../../facilities/entities/services.entity';
import { AppointmentsPayload } from '../dto/appointments-payload.dto';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PaymentService } from 'src/payment/services/payment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { CreateExternalAppointmentInput } from '../dto/create-external-appointment.input';
import { AppointmentPayload, PatientPastUpcomingAppointment } from '../dto/appointment-payload.dto';
import { Appointment, AppointmentCreateType, AppointmentStatus, BillingStatus, PaymentType } from '../entities/appointment.entity';
import {
  CancelAppointment, GetAppointments, GetFacilityAppointmentsInput, GetPatientAppointmentInput, RemoveAppointment,
  UpdateAppointmentBillingStatusInput, UpdateAppointmentInput, UpdateAppointmentStatusInput
} from '../dto/update-appointment.input';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly paginationService: PaginationService,
    private readonly doctorService: DoctorService,
    private readonly connection: Connection,
    private readonly patientService: PatientService,
    private readonly mailerService: MailerService,
    private readonly utilsService: UtilsService,
    private readonly facilityService: FacilityService,
    private readonly servicesService: ServicesService,
    private readonly contractService: ContractService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService
  ) { }

  /**
   * Creates appointment
   * @param createAppointmentInput 
   * @returns appointment 
   */
  async createAppointment(createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //fetch already exiting appointment
      const appointmentNumber = await this.utilsService.generateString(8)
      const appointmentObj = await this.findAppointment(createAppointmentInput.providerId, createAppointmentInput.patientId)
      if (!appointmentObj) {
        //creating appointment
        const token = createToken();
        const appointmentInstance = this.appointmentRepository.create({ ...createAppointmentInput, isExternal: true, token, appointmentNumber })
        //associate provider 
        let provider
        if (createAppointmentInput.providerId) {
          provider = await this.doctorService.findOne(createAppointmentInput.providerId)
          appointmentInstance.providerId = provider.id
          appointmentInstance.provider = provider
        }
        //associate patient
        let patient
        if (createAppointmentInput.patientId) {
          patient = await this.patientService.findOne(createAppointmentInput.patientId)
          appointmentInstance.patient = patient
          appointmentInstance.patientId = patient.id
        }
        //associate facility 
        let facility
        if (createAppointmentInput.facilityId) {
          facility = await this.facilityService.findOne(createAppointmentInput.facilityId)
          appointmentInstance.facility = facility
          appointmentInstance.facilityId = facility.id
          const { practice } = facility || {}
          if (practice) {
            const { id } = practice
            appointmentInstance.practiceId = id
          }
        }
        //associate service 
        if (createAppointmentInput.appointmentTypeId) {
          const service = await this.servicesService.findOne(createAppointmentInput.appointmentTypeId)
          appointmentInstance.appointmentType = service
          appointmentInstance.appointmentTypeId = service.id
        }
        //associate contract
        if (createAppointmentInput.paymentType === PaymentType.CONTRACT) {
          const { contractNumber, organizationName } = createAppointmentInput
          const contract = await this.contractService.create({ contractNumber, organizationName })
          appointmentInstance.contract = contract
        }
        //save appointment & commit transaction
        const appointment = await this.appointmentRepository.save(appointmentInstance);
        await queryRunner.commitTransaction();
        if (patient.phonePermission) {
          this.triggerSmsNotification(appointment, provider, patient, facility, true)
        }
        if (createAppointmentInput.appointmentCreateType === AppointmentCreateType.TELEHEALTH) {
          const scheduleTime = `${moment(appointmentInstance.scheduleStartDateTime).format("ddd MMM. DD, YYYY")} at ${moment(appointmentInstance.scheduleStartDateTime).format("hh:mm A")}`
          this.mailerService.sendAppointmentTelehealthEmail(patient.email, patient.firstName + ' ' + patient.lastName, scheduleTime, provider.firstName + ' ' + provider.lastName, appointment.id)
        }
        return appointment
      }
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Your appointment with this provider already exists',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Creates external appointment 
   * @param createExternalAppointmentInput 
   * @returns appointment 
   */
  async createExternalAppointmentInput(createExternalAppointmentInput: CreateExternalAppointmentInput): Promise<Appointment> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //create patient 
      const appointmentNumber = await this.utilsService.generateString(8)
      const patient = await this.patientService.GetPatientByEmail(createExternalAppointmentInput.createPatientItemInput.email)
      let patientInstance;
      if (!patient) {
        patientInstance = await this.patientService.addPatient(createExternalAppointmentInput)
      } else {
        patientInstance = patient.patient;
      }
      const appointmentInstance = this.appointmentRepository.create({ ...createExternalAppointmentInput.createExternalAppointmentItemInput, isExternal: true, appointmentNumber })
      let provider
      if (createExternalAppointmentInput.createExternalAppointmentItemInput.providerId) {
        provider = await this.doctorService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.providerId)
        appointmentInstance.provider = provider
        appointmentInstance.providerId = provider.id
      }
      //associate patient
      if (patientInstance && patientInstance.id) {
        appointmentInstance.patient = patientInstance
        appointmentInstance.patientId = patientInstance.id
      }
      //associate facility 
      const facility = await this.facilityService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.facilityId)
      if (createExternalAppointmentInput.createExternalAppointmentItemInput.facilityId) {
        appointmentInstance.facility = facility
        appointmentInstance.facilityId = facility.id
      }
      //associate service 
      if (createExternalAppointmentInput.createExternalAppointmentItemInput.serviceId) {
        const service = await this.servicesService.findOne(createExternalAppointmentInput.createExternalAppointmentItemInput.serviceId)
        appointmentInstance.appointmentType = service
        appointmentInstance.appointmentTypeId = service.id
      }
      //custom token creation
      const token = createToken();
      appointmentInstance.token = token;
      const appointment = await this.appointmentRepository.save(appointmentInstance);
      this.mailerService.sendAppointmentConfirmationsEmail(patientInstance.email, patientInstance.firstName + ' ' + patientInstance.lastName, appointmentInstance.scheduleStartDateTime, token, patientInstance.id, false)
      await queryRunner.commitTransaction();
      if (patientInstance.phonePermission) {
        this.triggerSmsNotification(appointment, provider, patientInstance, facility, true)
      }
      return appointment
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Gets amount
   * @param id 
   * @returns amount 
   */
  async getAmount(id: string): Promise<Service> {
    try {
      return await this.servicesService.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Triggers sms notification
   * @param appointment 
   * @param provider 
   * @param patient 
   * @param facility 
   * @param IsBooked 
   * @returns  
   */
  async triggerSmsNotification(appointment: Appointment, provider: Doctor, patient: Patient, facility: Facility, IsBooked: boolean) {
    const currentContact = patient.contacts.filter(function (item) { return item.primaryContact })
    const facilityLocationLink = facility.contacts.filter(function (item) { return item.primaryContact })
    if (IsBooked) {
      return await this.utilsService.smsNotification({
        to: [currentContact[0].phone],
        body: `Your appointment # ${appointment.appointmentNumber} has been booked at ${appointment.scheduleStartDateTime} with ${provider.suffix ? provider.suffix : "Dr." + " " + provider.firstName + " " + provider.lastName} on location ${facilityLocationLink[0].locationLink} at ${facility.name} facility`
      });
    } else {
      return await this.utilsService.smsNotification({
        to: [currentContact[0].phone],
        body: `Your appointment # ${appointment.appointmentNumber} has been cancelled at ${appointment.scheduleStartDateTime} with ${provider.suffix ? provider.suffix : "Dr." + " " + provider.lastName} on location ${facilityLocationLink[0].locationLink} at ${facility.name} facility`
      });
    }
  }

  /**
   * Finds all appointments
   * @param appointmentInput 
   * @returns all appointments 
   */
  async findAllAppointments(appointmentInput: AppointmentInput): Promise<AppointmentsPayload> {
    try {
      const { paginationOptions, relationTable, searchString, sortBy, ...whereObj } = appointmentInput
      const whereStr = Object.keys(whereObj).reduce((acc, key) => {
        const transformedKey = key === 'appointmentStatus' ? 'status' : key
        if (whereObj[key]) {
          acc[transformedKey] = whereObj[key]
          return acc
        }
        return acc
      }, {})

      const { limit, page } = appointmentInput.paginationOptions
      const [first] = appointmentInput.searchString ? appointmentInput.searchString.split(' ') : ''
      let baseQuery = getConnection()
        .getRepository(Appointment)
        .createQueryBuilder('appointment')
        .skip((page - 1) * limit)
        .take(limit)
        .where(whereStr as ObjectLiteral)

      if (first) {
        baseQuery
          .innerJoin(Patient, 'appointmentWithSpecificPatient', `appointment.patientId = "appointmentWithSpecificPatient"."id"`)
          .innerJoin(Service, 'appointmentWithSpecificService', `appointment.appointmentTypeId = "appointmentWithSpecificService"."id"`)
          .andWhere(new Brackets(qb => {
            qb.where('appointmentWithSpecificPatient.firstName ILIKE :search', { search: `%${first}%` })
              .orWhere('appointmentWithSpecificPatient.lastName ILIKE :search', { search: `%${first}%` })
              .orWhere('appointmentWithSpecificPatient.email ILIKE :search', { search: `%${first}%` })
              .orWhere('appointmentWithSpecificService.name ILIKE :search', { search: `%${first}%` })
          }))
      }
      console.log('sortBy', sortBy)
      const [appointments, totalCount] = await baseQuery
        .orderBy('appointment.scheduleStartDateTime', sortBy ? sortBy as 'ASC' | 'DESC' : 'ASC')
        .getManyAndCount()

      const totalPages = Math.ceil(totalCount / limit)

      return {
        pagination: {
          totalCount,
          page,
          limit,
          totalPages,
        },
        appointments
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
 * Finds all upcoming appointments
 * @param upcomingAppointmentInputs
 * @returns all upcoming appointments appointments 
 */
  async findAllUpcomingAppointments(upComingAppointmentInput: UpComingAppointmentsInput): Promise<Appointment[]> {
    try {
      const { facilityId, patientId, practiceId, providerId } = upComingAppointmentInput
      const query = {
        ...(facilityId && facilityId !== null && {
          facilityId
        }),
        ...(patientId && patientId !== null && {
          patientId
        }),
        ...(practiceId && practiceId !== null && {
          practiceId
        }),
        ...(providerId && providerId !== null && {
          providerId
        })
      }

      const appointment = await this.appointmentRepository.find({
        where: query
      })

      return appointment
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Appointment> {
    return await this.appointmentRepository.findOne(id);
  }

  /**
   * Finds by token
   * @param token 
   * @returns by token 
   */
  async findByToken(token: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: {
        token: token
      }
    });
    if (appointment) {
      return appointment
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }

  /**
   * Finds appointment by provider id
   * @param getSlots 
   * @param utc_start_date_minus_offset 
   * @param utc_end_date_minus_offset 
   * @returns appointment by provider id 
   */
  async findAppointmentByProviderId(getSlots: GetSlots, utc_start_date_minus_offset, utc_end_date_minus_offset): Promise<Appointment[]> {
    if (getSlots.providerId)
      return await this.appointmentRepository.find({
        where: {
          scheduleStartDateTime: MoreThanOrEqual(utc_start_date_minus_offset),
          scheduleEndDateTime: LessThanOrEqual(utc_end_date_minus_offset),
          providerId: getSlots.providerId,
        }
      })
    else if (getSlots.facilityId) {
      return await this.appointmentRepository.find({
        where: {
          scheduleStartDateTime: MoreThanOrEqual(utc_start_date_minus_offset),
          scheduleEndDateTime: LessThanOrEqual(utc_end_date_minus_offset),
          facilityId: getSlots.facilityId,
        }
      })
    }
  }

  /**
   * Finds appointment
   * @param providerId 
   * @param patientId 
   * @returns  
   */
  async findAppointment(providerId: string, patientId: string) {
    return await this.appointmentRepository.findOne({
      where: [
        { patientId: patientId, providerId: providerId, status: AppointmentStatus.SCHEDULED }
      ]
    });
  }

  /**
   * Gets appointment
   * @param id 
   * @returns appointment 
   */
  async getAppointment(id: string): Promise<AppointmentPayload> {
    const appointment = await this.findOne(id);
    if (appointment) {
      return { appointment }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }

  async getAppointments(getAppointments: GetAppointments): Promise<Appointment[]> {
    if (getAppointments.doctorId) {
      const appointment = await this.appointmentRepository.find({
        where: [
          { providerId: getAppointments.doctorId, status: AppointmentStatus.SCHEDULED }
        ]
      })
      if (appointment) {
        return appointment
      }
    } else if (getAppointments.facilityId) {
      const appointment = await this.appointmentRepository.find({
        where: [
          { facilityId: getAppointments.facilityId, status: AppointmentStatus.SCHEDULED }
        ]
      })
      if (appointment) {
        return appointment
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }

  /**
   * Updates appointment
   * @param updateAppointmentInput 
   * @returns appointment 
   */
  async updateAppointment(updateAppointmentInput: UpdateAppointmentInput): Promise<Appointment> {
    try {
      return await this.utilsService.updateEntityManager(Appointment, updateAppointmentInput.id, updateAppointmentInput, this.appointmentRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates appointment status
   * @param updateAppointmentStatusInput 
   * @returns appointment status 
   */
  async updateAppointmentStatus(updateAppointmentStatusInput: UpdateAppointmentStatusInput): Promise<Appointment> {
    try {
      return await this.utilsService.updateEntityManager(Appointment, updateAppointmentStatusInput.id, updateAppointmentStatusInput, this.appointmentRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates appointment billing status
   * @param updateAppointmentBillingStatusInput 
   * @returns appointment billing status 
   */
  async updateAppointmentBillingStatus(updateAppointmentBillingStatusInput: UpdateAppointmentBillingStatusInput): Promise<Appointment> {
    try {
      return await this.utilsService.updateEntityManager(Appointment, updateAppointmentBillingStatusInput.id, updateAppointmentBillingStatusInput, this.appointmentRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes appointment
   * @param { id } 
   */
  async removeAppointment({ id }: RemoveAppointment) {
    try {
      await this.appointmentRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Cancels appointment
   * @param token 
   */
  async cancelAppointment(cancelAppointment: CancelAppointment) {
    try {
      const appointment = await this.findByToken(cancelAppointment.token)
      if (appointment) {
        const patient = await this.patientService.findOne(appointment.patientId)
        const provider = await this.doctorService.findOne(appointment.providerId)
        const facility = await this.facilityService.findOne(appointment.facilityId)
        if (patient.phonePermission) {
          this.triggerSmsNotification(appointment, provider, patient, facility, false)
        }
        if (appointment.billingStatus === BillingStatus.PAID) {
          const transaction = await this.paymentService.getTransactionByAppointmentId(appointment.id)
          if (transaction) {
            await this.paymentService.refund(transaction.transactionId, transaction.id)
          }
          await this.updateAppointmentBillingStatus({ id: appointment.id, billingStatus: BillingStatus.REFUND })
        }
        return await this.appointmentRepository.save({ id: appointment.id, status: AppointmentStatus.CANCELLED, token: '', reason: cancelAppointment.reason, })
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Appointment cancelled or not found',
      });

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets patient appointment
   * @param getPatientAppointmentInput 
   * @returns patient appointment 
   */
  async getPatientAppointment(getPatientAppointmentInput: GetPatientAppointmentInput): Promise<Appointment[]> {
    const appointment = await this.appointmentRepository.find({
      where: [
        { patientId: getPatientAppointmentInput.patientId }
      ]
    })
    if (appointment) {
      return appointment
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }

  /**
   * Gets patient past upcoming appointment
   * @param getPatientAppointmentInput 
   * @returns patient past upcoming appointment 
   */
  async getPatientPastUpcomingAppointment(getPatientAppointmentInput: GetPatientAppointmentInput): Promise<PatientPastUpcomingAppointment> {
    const currentDate = new Date()
    const pastAppointment = await this.appointmentRepository.findOne({
      where: {
        patientId: getPatientAppointmentInput.patientId,
        scheduleStartDateTime: LessThan(currentDate)
      }
    })

    const upcomingAppointment = await this.appointmentRepository.findOne({
      where:
      {
        patientId: getPatientAppointmentInput.patientId,
        scheduleEndDateTime: MoreThan(currentDate)
      }
    })

    const appointment = {
      upcomingAppointment,
      pastAppointment
    }

    if (appointment) {
      return appointment
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Appointment not found',
    });
  }
  /**
   * Gets facility appointment
   * @param getFacilityAppointmentsInput
   * @returns facility appointments 
   */
  async getFacilityAppointments(getFacilityAppointmentsInput: GetFacilityAppointmentsInput) {
    return await this.appointmentRepository.find({ where: { facilityId: getFacilityAppointmentsInput.facilityId } })
  }

  /**
   * Gets facility appointment count
   * @param getFacilityAppointmentsInput
   * @returns facility appointments count
   */
  async getFacilityAppointmentCount(getFacilityAppointmentsInput: GetFacilityAppointmentsInput) {
    return await this.appointmentRepository.count({ where: { facilityId: getFacilityAppointmentsInput.facilityId } })
  }
}
