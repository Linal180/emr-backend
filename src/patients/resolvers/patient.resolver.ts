import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { Patient } from '../entities/patient.entity';
import { Employer } from '../entities/employer.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Contact } from 'src/providers/entities/contact.entity';
import { DoctorPatient } from '../entities/doctorPatient.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { FamilyHistory } from 'src/patientCharting/entities/familyHistory.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//services
import { PatientService } from '../services/patient.service';
import { EmployerService } from '../services/employer.service';
import { ContactService } from 'src/providers/services/contact.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { FamilyHistoryService } from 'src/patientCharting/services/familyHistory.service';
//guards
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import PatientInput from '../dto/patient-input.dto';
import { PatientInfoInput } from '../dto/patient-info.input';
import { CreatePatientInput } from '../dto/create-patient.input';
import { PatientInviteInput } from '../dto/patient-invite.input';
import PatientAttachmentsInput from '../dto/patient-attachments-input.dto';
import { GetPatient, RemovePatient } from '../dto/update-patientItem.input';
import { UpdatePatientProfileInput } from '../dto/update-patient-profile.input';
import { GetFacilityPatientsInput } from 'src/facilities/dto/facility-input.dto';
import { UpdatePatientInput, UpdatePatientNoteInfoInputs } from '../dto/update-patient.input';
import { PatientProviderInputs, UpdatePatientProvider, UpdatePatientProviderRelationInputs } from '../dto/update-patient-provider.input';
//payloads
import { PatientsPayload } from '../dto/patients-payload.dto';
import { PatientAttachmentsPayload } from '../dto/patients-attachments-payload.dto';
import { PatientDoctorPayload, PatientPayload, PatientProviderPayload } from '../dto/patient-payload.dto';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(
    private readonly patientService: PatientService,
    private readonly contactService: ContactService,
    private readonly facilityService: FacilityService,
    private readonly employerService: EmployerService,
    private readonly attachmentsService: AttachmentsService,
    private readonly appointmentService: AppointmentService,
    private readonly familyHistoryService: FamilyHistoryService,
  ) { }

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
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'patientInfo')
  async patientInfo(@Args('patientInfoInput') patientInfoInput: PatientInfoInput) {
    return {
      patient: await this.patientService.patientInfo(patientInfoInput),
      response: { status: 200, message: 'Patient info added successfully' }
    };
  }

  @Mutation(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatient')
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
  @SetMetadata('name', 'updatePatientNoteInfoInputs')
  async updatePatientNoteInfo(@Args('updatePatientNoteInfoInputs')
  updatePatientNoteInfoInputs: UpdatePatientNoteInfoInputs): Promise<PatientPayload> {
    return {
      patient: await this.patientService.updatePatientNoteInfo(updatePatientNoteInfoInputs),
      response: { status: 200, message: 'Patient notes updated successfully' }
    };
  }

  @Mutation(() => PatientDoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePatientProviderRelation')
  async updatePatientProviderRelation(@Args('updatePatientProviderRelationInputs')
  updatePatientProviderRelationInputs: UpdatePatientProviderRelationInputs): Promise<PatientDoctorPayload> {
    return {
      provider: await this.patientService.updatePatientProviderRelation(updatePatientProviderRelationInputs),
      response: { status: 200, message: 'Patient notes updated successfully' }
    };
  }

  //queries

  @Query(() => PatientsPayload)
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

  @Query(() => PatientAttachmentsPayload)
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

  @Query(() => PatientsPayload)
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

  @Query(() => PatientPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatient')
  async getPatient(@Args('getPatient') getPatient: GetPatient): Promise<PatientPayload> {
    const patients = await this.patientService.GetPatient(getPatient.id)
    return {
      ...patients,
      response: { status: 200, message: 'Patient fetched successfully' }
    };
  }

  @Query(() => PatientProviderPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientProviders')
  async getPatientProviders(@Args('getPatient') getPatient: GetPatient): Promise<PatientProviderPayload> {
    const providers = await this.patientService.usualProvider(getPatient.id);
    return {
      providers,
      response: { status: 200, message: 'Patient fetched successfully' }
    };
  }

  @Query(() => PatientDoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPatientProvider')
  async getPatientProvider(@Args('patientProviderInputs') patientProviderInputs: PatientProviderInputs): Promise<PatientDoctorPayload> {
    const provider = await this.patientService.getProvider(patientProviderInputs);
    return {
      provider,
      response: { status: 200, message: 'Patient fetched successfully' }
    };
  }

  @Query(() => PatientsPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getFacility')
  async getFacilityPatients(@Args('getFacilityPatientsInput') getFacilityPatientsInput: GetFacilityPatientsInput): Promise<PatientsPayload> {
    const facility = await this.patientService.getFacilityPatients(getFacilityPatientsInput)
    return {
      ...facility,
      response: { status: 200, message: 'Facility fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Appointment])
  async appointments(@Parent() patient: Patient): Promise<Appointment[]> {
    if (patient?.id) {
      return await this.appointmentService.getPatientAppointment({ patientId: patient.id });
    }
  }

  @ResolveField(() => [DoctorPatient])
  async doctorPatients(@Parent() patient: Patient): Promise<DoctorPatient[]> {
    if (patient?.id) {
      const provider = await this.patientService.usualProvider(patient.id);
      return provider;
    }
  }

  @ResolveField(() => Doctor)
  async primaryDoctor(@Parent() patient: Patient): Promise<Doctor> {
    if (patient?.id) {
      const provider = await this.patientService.getPrimaryProvider(patient.id);
      return provider;
    }
  }

  @ResolveField(() => Facility)
  async facility(@Parent() patient: Patient): Promise<Facility> {
    if (patient && patient?.facilityId) {
      return await this.facilityService.findOne(patient.facilityId);
    }
  }

  @ResolveField(() => Employer)
  async employer(@Parent() patient: Patient): Promise<Employer> {
    if (patient?.id) {
      return await this.employerService.getEmployerByPatientId(patient.id);
    }
  }

  @ResolveField(() => [Attachment])
  async attachments(@Parent() patient: Patient): Promise<Attachment[]> {
    if (patient?.id) {
      return await this.attachmentsService.findAttachments(patient.id, AttachmentType.PATIENT);
    }
  }

  @ResolveField(() => String)
  async profileAttachment(@Parent() patient: Patient): Promise<string> {
    if (patient?.id) {
      return await this.attachmentsService.findProfileAttachment(patient.id, AttachmentType.PATIENT);
    }
  }

  @ResolveField(() => [Contact])
  async contacts(@Parent() patient: Patient): Promise<Contact[]> {
    if (patient?.id) {
      return await this.contactService.findContactsByPatientId(patient.id);
    }
  }

  @ResolveField(() => [FamilyHistory])
  async familyHistory(@Parent() patient: Patient): Promise<FamilyHistory[]> {
    if (patient?.id) {
      return await this.familyHistoryService.findByPatientId(patient.id);
    }
  }
}
