//packages block
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException
} from '@nestjs/common';
import {
  Brackets, Connection, getConnection, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, ObjectLiteral,
  Repository, SelectQueryBuilder
} from 'typeorm';
//entities
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { GetSlots } from 'src/providers/dto/update-schedule.input';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Service } from '../../facilities/entities/services.entity';
import {
  Appointment, AppointmentCreateType, AppointmentStatus, BillingStatus, PaymentType
} from '../entities/appointment.entity';
// services
import { ContractService } from './contract.service';
import { UtilsService } from 'src/util/utils.service';
import { MailerService } from 'src/mailer/mailer.service';
import { RoomService } from 'src/room/services/room.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PaymentService } from 'src/payment/services/payment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { ContactService } from 'src/providers/services/contact.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { ServicesService } from 'src/facilities/services/services.service';
import { PatientConsentService } from 'src/patients/services/patientConsent.service';
//  inputs
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { CreateExternalAppointmentInput } from '../dto/create-external-appointment.input';
import { AppointmentReminderInput, AssociateRoomToAppointmentInput } from '../dto/appointment-reminder-input.dto';
import { AppointmentInput, FindAllCalendarAppointmentsInput, FindAppointmentDateInput, LastVisitedAppointmentInput, UpComingAppointmentsInput } from '../dto/appointment-input.dto';
import {
  CancelAppointment, GetAppointments, GetAppointmentWithToken, GetFacilityAppointmentsInput, GetPatientAppointmentInput, RemoveAppointment,
  UpdateAppointmentBillingStatusInput, UpdateAppointmentInput, UpdateAppointmentStatusInput
} from '../dto/update-appointment.input';
//payloads
import { AppointmentInsuranceStatus, AppointmentsPayload, UpcomingAppointmentsPayload } from '../dto/appointments-payload.dto';
import { AppointmentPayload, PatientPastUpcomingAppointment } from '../dto/appointment-payload.dto';
// helpers
import { createToken } from 'src/lib/helper';
import { CalendarViewType, FromToDate } from 'src/lib/constants';
import { Billing } from 'src/billings/entities/billing.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly connection: Connection,
    private readonly roomService: RoomService,
    private readonly utilsService: UtilsService,
    private readonly mailerService: MailerService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
    private readonly contactService: ContactService,
    private readonly facilityService: FacilityService,
    private readonly servicesService: ServicesService,
    private readonly contractService: ContractService,
    private readonly paginationService: PaginationService,
    private readonly patientConsentService: PatientConsentService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService
  ) { }

  /**
   * Finds appointment date
   * @param params 
   * @returns appointment date 
   */
  findAppointmentDate(params: FindAppointmentDateInput): FromToDate {
    const { appointmentDate, currentView } = params;

    const [, , day] = appointmentDate?.split('-')
    const from = moment(appointmentDate, 'YYYY-MM-DD')
    const to = moment(appointmentDate, 'YYYY-MM-DD')
    switch (currentView) {
      case CalendarViewType.Day:
        return {
          fromDate: from.subtract(1, 'day').format('YYYY-MM-DD'),
          toDate: to.add(1, 'day').format('YYYY-MM-DD')
        }

      case CalendarViewType.Month:
        return {
          fromDate: from.set('day', 2 + (-day)).format('YYYY-MM-DD'),
          toDate: to.add(1, 'month').set('day', 5 + (-day)).format('YYYY-MM-DD'),
        }

      case CalendarViewType.Week:
        return {
          fromDate: from.subtract(7, 'day').format('YYYY-MM-DD'),
          toDate: to.add(7, 'day').format('YYYY-MM-DD'),
        }

      default:
        return {
          fromDate: from.set('day', 2 + (-day)).format('YYYY-MM-DD'),
          toDate: to.add(1, 'month').set('day', 5 + (-day)).format('YYYY-MM-DD'),
        }
    }
  }

  /**
   * Finds calendar appointment
   * @param params 
   * @returns calendar appointment 
   */
  async findCalendarAppointment(params: FindAllCalendarAppointmentsInput): Promise<AppointmentsPayload> {
    try {
      const { appointmentDate, currentView, paginationOptions, facilityId, practiceId, providerId } = params;
      const { fromDate, toDate } = this.findAppointmentDate({ appointmentDate, currentView })

      const { data: appointments, ...pagination } = await this.paginationService.willPaginate<Appointment>(this.appointmentRepository,
        {
          paginationOptions, facilityId, practiceId, providerId,
          appointmentFromDate: fromDate, appointmentToDate: toDate
        }, undefined, { columnName: 'appointmentDate', order: 'ASC' });

      return { appointments, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

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
      const appointmentNumber = await this.utilsService.generateString(8);
      let appointmentObj: Appointment | null = null;

      if (createAppointmentInput?.providerId && createAppointmentInput.patientId) {
        appointmentObj = await this.findAppointment(createAppointmentInput.providerId, createAppointmentInput.patientId)
      }

      if (!appointmentObj) {
        //creating appointment
        const token = createToken();
        const appointmentInstance = this.appointmentRepository.create({ ...createAppointmentInput, isExternal: false, token, appointmentNumber })
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
        let facility: null | Facility
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

        if (patient.phoneEmailPermission) {
          this.triggerSmsNotification(appointment, provider, patient, facility, true)
        }

        if (patient?.email) {
          if (createAppointmentInput.appointmentCreateType === AppointmentCreateType.APPOINTMENT) {

            const { email, phone } = await this.contactService.findPrimaryContactByFacilityId(facility?.id);

            this.mailerService.sendAppointmentConfirmationsEmail({
              id: patient?.id,
              patientPortal: false,
              facilityEmail: email,
              facilityPhone: phone,
              email: patient?.email,
              token: appointment?.token,
              slotStartTime: appointment?.scheduleStartDateTime,
              fullName: `${patient?.firstName || ''} ${patient?.lastName || ''}`,
            })
          }

          if (createAppointmentInput.appointmentCreateType === AppointmentCreateType.TELEHEALTH) {
            const scheduleTime = `${moment(appointmentInstance.scheduleStartDateTime).format("ddd MMM. DD, YYYY")} at ${moment(appointmentInstance.scheduleStartDateTime).format("hh:mm A")}`
            this.mailerService.sendAppointmentTelehealthEmail(patient.email, patient.firstName + ' ' + patient.lastName, scheduleTime, provider.firstName + ' ' + provider.lastName, appointment.id)
          }
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
      let patientInstance: null | Patient;
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

      if (patientInstance?.email) {
        const { email, phone } = await this.contactService.findPrimaryContactByFacilityId(facility?.id);

        this.mailerService.sendAppointmentConfirmationsEmail({
          token: token,
          facilityEmail: email,
          facilityPhone: phone,
          patientPortal: false,
          id: patientInstance?.id,
          email: patientInstance?.email,
          slotStartTime: appointmentInstance?.scheduleStartDateTime,
          fullName: `${patientInstance?.firstName || ''} ${patientInstance?.lastName || ''}`,
        })
      }

      await queryRunner.commitTransaction();
      if (patientInstance.phoneEmailPermission) {
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

    const currentContact = patient?.contacts?.find(({ primaryContact }) => primaryContact)
    const facilityLocationLink = facility?.contacts?.find(({ primaryContact }) => primaryContact)

    const { name } = facility || {}
    const { phone } = currentContact || {}
    const { locationLink } = facilityLocationLink || {}
    const { suffix, firstName, lastName } = provider || {}
    const { appointmentNumber, scheduleStartDateTime } = appointment || {}

    const body = `Your appointment # ${appointmentNumber} has been ${IsBooked ? 'booked' : 'cancelled'} at ${scheduleStartDateTime} with ${suffix || `Dr. ${firstName} ${lastName}`} on location ${locationLink} at ${name} facility`;
    if (phone) {
      return await this.utilsService.smsNotification({ to: [phone], body });
    }
    else {
      throw new Error("Phone # Not Found");
    }
  }


  /**
   * Sends appointment reminder
   * @param appointmentReminderInput 
   */
  async sendAppointmentReminder(appointmentReminderInput: AppointmentReminderInput) {
    const { appointmentId } = appointmentReminderInput
    try {
      const appointmentInfo = await this.appointmentRepository.findOne({
        relations: ['patient', 'facility', 'provider'],
        where: { id: appointmentId }
      })

      const { patient, facility, provider, timeZone } = appointmentInfo || {}

      const patientContacts = await this.contactService.findContactsByPatientId(patient?.id)
      const { phone, email } = patientContacts.find((item) => item.primaryContact) || {}

      const slotStart = momentTimezone(appointmentInfo.scheduleStartDateTime).tz(timeZone).format('MM-DD-YYYY hh:mm A')
      const slotStartTime = `${slotStart} ( ${timeZone} Time Zone )`

      let messageBody = `Your appointment # ${appointmentInfo.appointmentNumber} is scheduled at ${slotStartTime} at ${facility.name} facility`

      if (provider) {
        messageBody = `Your appointment # ${appointmentInfo.appointmentNumber} is scheduled at ${slotStartTime} with ${provider.suffix ? provider.suffix : "Dr." + " " + provider.firstName + " " + provider.lastName} at ${facility.name} facility`
      }

      if (phone) {
        const transformedPhone = `+1${phone}`
        await this.utilsService.smsNotification({
          to: [transformedPhone],
          body: messageBody
        });
      }

      if (email) {
        const { email, phone } = await this.contactService.findPrimaryContactByFacilityId(facility?.id);

        const inputs = {
          email: patient?.email,
          fullName: patient?.firstName + ' ' + patient?.lastName,
          slotStartTime,
          facilityName: facility?.name,
          facilityEmail: email,
          facilityPhone: phone,
        }

        await this.mailerService.sendAppointmentReminderEmail(inputs)
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Associates room to appointment
   * @param params 
   * @returns room to appointment 
   */
  async associateRoomToAppointment(params: AssociateRoomToAppointmentInput): Promise<Appointment> {
    try {
      const { appointmentId, roomId } = params
      const appointmentInstance = await this.findOne(appointmentId);
      if (roomId) {
        const roomInstance = await this.roomService.findOne(roomId);
        appointmentInstance.room = roomInstance
        appointmentInstance.roomId = roomInstance?.id
      } else {
        appointmentInstance.room = null
        appointmentInstance.roomId = null
      }
      return await this.appointmentRepository.save(appointmentInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds appointment query
   * @param appointmentInput 
   * @returns appointment query 
   */
  async findAppointmentQuery(appointmentInput: AppointmentInput): Promise<SelectQueryBuilder<Appointment>> {
    const { paginationOptions, relationTable, searchString, sortBy, appointmentDate, isCheckedIn, invoiceNumber, ...whereObj } = appointmentInput
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
      .andWhere(appointmentDate ? '"appointment"."appointmentDate" = :appointmentDate' : '1 = 1', { appointmentDate: appointmentDate })
      .andWhere(isCheckedIn ? '"appointment"."checkedInAt" is not null' : '1 = 1')

    if (first) {
      baseQuery
        .innerJoin(Patient, 'appointmentWithSpecificPatient', `appointment.patientId = "appointmentWithSpecificPatient"."id"`)
        .innerJoin(Service, 'appointmentWithSpecificService', `appointment.appointmentTypeId = "appointmentWithSpecificService"."id"`)
        .innerJoin(Contact, 'patientContact', `patientContact.patientId = "appointment"."patientId" AND patientContact.primaryContact is true`)
        .andWhere(new Brackets(qb => {
          qb.where('appointmentWithSpecificPatient.firstName ILIKE :search', { search: `%${first}%` })
            .orWhere('appointmentWithSpecificPatient.lastName ILIKE :search', { search: `%${first}%` })
            .orWhere('appointmentWithSpecificPatient.email ILIKE :search', { search: `%${first}%` })
            .orWhere('appointmentWithSpecificPatient.patientRecord ILIKE :search', { search: `%${first}%` })
            .orWhere('appointmentWithSpecificPatient.dob ILIKE :patientDob', { patientDob: moment(new Date(first)).format("MM-DD-YYYY") })
            .orWhere('appointmentWithSpecificService.name ILIKE :search', { search: `%${first}%` })
            .orWhere('patientContact.phone ILIKE :patientPhone', { patientPhone: `%${first}%` })
        }))
    }

    if (invoiceNumber) {
      baseQuery
      .innerJoin(Billing, 'appointmentWithSpecificBilling', `appointment.id = "appointmentWithSpecificBilling"."appointmentId"`)
      .andWhere('appointmentWithSpecificBilling.claimNo ILIKE :search', { search: `%${invoiceNumber}%` })
    }

    return baseQuery
  }

  /**
   * Finds all appointments
   * @param appointmentInput 
   * @returns all appointments 
   */
  async findAllAppointments(appointmentInput: AppointmentInput): Promise<AppointmentsPayload> {
    try {
      const { paginationOptions } = appointmentInput
      const { page, limit } = paginationOptions
      const baseQuery = await this.findAppointmentQuery(appointmentInput)
      const [appointments, totalCount] = await baseQuery
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
   * @param upComingAppointmentInput 
   * @returns all upcoming appointments 
   */
  async findAllUpcomingAppointments(upComingAppointmentInput: UpComingAppointmentsInput): Promise<UpcomingAppointmentsPayload> {
    try {
      const { paginationOptions } = upComingAppointmentInput
      const { shouldFetchPast, appointmentTime, ...appointmentInput } = upComingAppointmentInput
      const { page, limit } = paginationOptions
      const baseQuery = await this.findAppointmentQuery(appointmentInput)
      const [appointments, totalCount] = await baseQuery
        .andWhere(`"appointment"."scheduleStartDateTime" ${shouldFetchPast ? '<' : '>'}= :appointmentTime`, { appointmentTime: appointmentTime ? moment(appointmentTime) : moment() })
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
   * Finds patient last appointment
   * @param lastVisitedAppointmentInput 
   * @returns patient last appointment 
   */
  async findPatientLastAppointment(lastVisitedAppointmentInput: LastVisitedAppointmentInput): Promise<Appointment> {
    try {
      const { patientId } = lastVisitedAppointmentInput

      const appointment = await this.appointmentRepository.findOne({
        where: {
          patientId
        },
        order: {
          scheduleStartDateTime: 'DESC'
        },
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
 * Finds one
 * @param id 
 * @returns one 
 */
  async findAppointmentInsuranceStatus(id: string): Promise<AppointmentInsuranceStatus> {
    const appointment = await this.appointmentRepository.findOne(id, { select: ['insuranceStatus', 'id'] });
    return {
      id: appointment.id,
      insuranceStatus: appointment.insuranceStatus
    }
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
  async findAppointment(providerId: string, patientId: string): Promise<Appointment> {
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


  /**
   * Gets appointments
   * @param getAppointments 
   * @returns appointments 
   */
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
      const { shouldSendEmail, ...appointmentInfoToUpdate } = updateAppointmentInput
      const appointment = await this.utilsService.updateEntityManager(Appointment, appointmentInfoToUpdate.id, { ...appointmentInfoToUpdate, token: createToken() }, this.appointmentRepository);
      const { patient } = await this.patientService.GetPatient(appointment?.patientId)

      if (patient?.email && shouldSendEmail) {
        if (appointment.appointmentCreateType === AppointmentCreateType.APPOINTMENT) {
          const { email, phone } = await this.contactService.findPrimaryContactByFacilityId(appointment?.facilityId);

          this.mailerService.sendAppointmentConfirmationsEmail({
            id: patient?.id,
            facilityEmail: email,
            facilityPhone: phone,
            patientPortal: false,
            email: patient?.email,
            token: appointment?.token,
            slotStartTime: appointment?.scheduleStartDateTime,
            fullName: `${patient?.firstName || ''} ${patient?.lastName || ''}`,
          })
        }

        if (appointment.appointmentCreateType === AppointmentCreateType.TELEHEALTH) {
          const provider = await this.doctorService.findOne(appointment?.providerId)
          const scheduleTime = `${moment(appointment.scheduleStartDateTime).format("ddd MMM. DD, YYYY")} at ${moment(appointment.scheduleStartDateTime).format("hh:mm A")}`
          this.mailerService.sendAppointmentTelehealthEmail(patient.email, patient.firstName + ' ' + patient.lastName, scheduleTime, provider.firstName + ' ' + provider.lastName, appointment.id)
        }
      }

      return appointment;
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
      //check patient consent
      const patientConsent = await this.patientConsentService.findByAppointmentId(id);
      if (patientConsent) {
        await this.patientConsentService.remove(patientConsent?.id)
      }
      await this.appointmentRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
    * Cancels appointment
    * @param token 
    */
  async getAppointmentWithToken(getAppointmentWithToken: GetAppointmentWithToken): Promise<Appointment> {
    try {
      const appointment = await this.findByToken(getAppointmentWithToken.token)
      if (appointment) {
        return appointment
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Appointment not found',
      });

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
        if (patient.phoneEmailPermission) {
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

  /**
   * Saves appointment service
   * @param input 
   * @returns save 
   */
  async save(input: UpdateAppointmentInput): Promise<Appointment> {
    try {
      return await this.appointmentRepository.save(input)
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Gets appointment by patient consent
   * @param id 
   * @returns appointment by patient consent 
   */
  async getAppointmentByPatientConsent(id: string): Promise<Appointment> {
    return await this.appointmentRepository.findOne({ where: { patientConsent: id } })
  }

  async fetchPatientReceivables(patientId) {

  }
}
