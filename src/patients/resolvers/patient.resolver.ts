import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { FacilityService } from 'src/facilities/services/facility.service';
import { Contact } from 'src/providers/entities/contact.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { ContactService } from 'src/providers/services/contact.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { CreatePatientInput } from '../dto/create-patient.input';
import PatientAttachmentsInput from '../dto/patient-attachments-input.dto';
import { PatientInfoInput } from '../dto/patient-info.input';
import PatientInput from '../dto/patient-input.dto';
import { PatientInviteInput } from '../dto/patient-invite.input';
import { PatientPayload } from '../dto/patient-payload.dto';
import { PatientAttachmentsPayload } from '../dto/patients-attachments-payload.dto';
import { PatientsPayload } from '../dto/patients-payload.dto';
import { UpdatePatientProfileInput } from '../dto/update-patient-profile.input';
import { UpdatePatientProvider } from '../dto/update-patient-provider.input';
import { UpdatePatientInput, UpdatePatientNoteInfoInputs } from '../dto/update-patient.input';
import { GetPatient, RemovePatient } from '../dto/update-patientItem.input';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Employer } from '../entities/employer.entity';
import { Patient } from '../entities/patient.entity';
import { EmployerService } from '../services/employer.service';
import { PatientService } from '../services/patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private readonly patientService: PatientService,
    private readonly attachmentsService: AttachmentsService,
    private readonly employerService: EmployerService,
    private readonly contactService: ContactService,
    private readonly appointmentService: AppointmentService,
    private readonly facilityService: FacilityService) { }

  //mutations

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createPatient')
  async createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return {
      patient: await this.patientService.createPatient(createPatientInput),
      response: { status: 200, message: 'Patient created successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  async patientInfo(@Args('patientInfoInput') patientInfoInput: PatientInfoInput) {
    return {
      patient: await this.patientService.patientInfo(patientInfoInput),
      response: { status: 200, message: 'Patient info added successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  async updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    return {
      patient: await this.patientService.updatePatient(updatePatientInput),
      response: { status: 200, message: 'Patient updated successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientProfile')
  async updatePatientProfile(@Args('updatePatientProfileInput') updatePatientProfileInput: UpdatePatientProfileInput) {
    return {
      patient: await this.patientService.updatePatientProfile(updatePatientProfileInput),
      response: { status: 200, message: 'Patient profile updated successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'sendInviteToPatient')
  async sendInviteToPatient(@Args('patientInviteInput') patientInviteInput: PatientInviteInput) {
    return {
      patient: await this.patientService.sendInviteToPatient(patientInviteInput),
      response: { status: 200, message: 'Invite sent to patient successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientProvider')
  async updatePatientProvider(@Args('updatePatientProvider') updatePatientProvider: UpdatePatientProvider) {
    return {
      patient: await this.patientService.updatePatientProvider(updatePatientProvider),
      response: { status: 200, message: 'Patient Provider updated successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePatient')
  async removePatient(@Args('removePatient') removePatient: RemovePatient) {
    await this.patientService.removePatient(removePatient);
    return { response: { status: 200, message: 'Patient Deleted' } };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientNoteInfoInputs')
  async updatePatientNoteInfo(@Args('updatePatientNoteInfoInputs')
  updatePatientNoteInfoInputs: UpdatePatientNoteInfoInputs): Promise<PatientPayload> {
    return {
      patient: await this.patientService.updatePatientNoteInfo(updatePatientNoteInfoInputs),
      response: { status: 200, message: 'Patient notes updated successfully' }
    };
  }

  //queries

  @Query(returns => PatientsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllPatient')
  async findAllPatient(@Args('patientInput') patientInput: PatientInput): Promise<PatientsPayload> {
    const patients = await this.patientService.findAllPatients(patientInput)
    if (patients) {
      return {
        ...patients,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient not found',
    });
  }

  @Query(returns => PatientAttachmentsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findPatientAttachments')
  async findPatientAttachments(@Args('patientAttachmentsInput') patientAttachmentsInput: PatientAttachmentsInput): Promise<PatientAttachmentsPayload> {
    const attachments = await this.attachmentsService.patientAttachments(patientAttachmentsInput)
    if (attachments) {
      return {
        ...attachments,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient Attachments not found',
    });
  }

  @Query(returns => PatientsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllPatients')
  async fetchAllPatients(@Args('patientInput') patientInput: PatientInput): Promise<PatientsPayload> {
    const patients = await this.patientService.fetchAllPatients(patientInput)
    if (patients) {
      return {
        ...patients,
        response: {
          message: "OK", status: 200,
        }
      }
    }

    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient not found',
    });
  }

  @Query(returns => PatientPayload)
  async getPatient(@Args('getPatient') getPatient: GetPatient): Promise<PatientPayload> {
    const patients = await this.patientService.GetPatient(getPatient.id)
    return {
      ...patients,
      response: { status: 200, message: 'Patient fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Appointment])
  async appointments(@Parent() patient: Patient): Promise<Appointment[]> {
    if (patient) {
      return await this.appointmentService.getPatientAppointment({ patientId: patient.id });
    }
  }

  @ResolveField(() => [Doctor])
  async doctorPatients(@Parent() patient: Patient): Promise<DoctorPatient[]> {
    if (patient && patient.id) {
      const provider = await this.patientService.usualProvider(patient.id);
      return provider;
    }
  }

  @ResolveField(() => [Facility])
  async facility(@Parent() patient: Patient): Promise<Facility> {
    if (patient && patient.facilityId) {
      return await this.facilityService.findOne(patient.facilityId);
    }
  }

  @ResolveField(() => [Employer])
  async employer(@Parent() patient: Patient): Promise<Employer> {
    if (patient) {
      return await this.employerService.getEmployerByPatientId(patient.id);
    }
  }

  @ResolveField(() => [Attachment])
  async attachments(@Parent() patient: Patient): Promise<Attachment[]> {
    if (patient) {
      return await this.attachmentsService.findAttachments(patient.id, AttachmentType.PATIENT);
    }
  }

  @ResolveField(() => [Contact])
  async contacts(@Parent() patient: Patient): Promise<Contact[]> {
    if (patient) {
      return await this.contactService.findContactsByPatientId(patient.id);
    }
  }
}
