import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { TriageNotes } from '../entities/triageNotes.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
//services
import { TriageNotesService } from '../services/triageNotes.service';
import { PatientService } from 'src/patients/services/patient.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
//inputs
import PatientTriageNoteInput from '../dto/triageNotes-input.dto';
import { CreateTriageNoteInput } from '../dto/create-triageNote.input';
import { GetPatientTriageNote, RemoveTriageNote, UpdateTriageNoteInput } from '../dto/update-triageNote.input';
//payloads
import { TriageNotePayload, TriageNotesPayload } from '../dto/triageNote-payload.dto';

@Resolver(() => TriageNotes)
export class TriageNotesResolver {
  constructor(
    private readonly triageNotesService: TriageNotesService,
    private readonly appointmentService: AppointmentService,
    private readonly patientService: PatientService,
    ) { }

  @Mutation(() => TriageNotePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'addPatientTriageNote')
  async addPatientTriageNote(@Args('createTriageNoteInput') createTriageNoteInput: CreateTriageNoteInput): Promise<TriageNotePayload> {
    return {
      triageNotes: await this.triageNotesService.addTriageNotes(createTriageNoteInput),
      response: { status: 200, message: 'Patient triageNote created successfully' }
    };
  }

  @Mutation(() => TriageNotePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePatientTriageNote')
  async updatePatientTriageNote(@Args('updateTriageNoteInput') updateTriageNoteInput: UpdateTriageNoteInput): Promise<TriageNotePayload> {
    return {
      triageNotes: await this.triageNotesService.updateTriageNotes(updateTriageNoteInput),
      response: { status: 200, message: 'Patient vital updated successfully' }
    };
  }

  @Query(returns => TriageNotesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllPatientTriageNotes')
  async findAllPatientTriageNotes(@Args('patientTriageNoteInput') patientTriageNoteInput: PatientTriageNoteInput): Promise<TriageNotesPayload> {
    const patientTriageNotes = await this.triageNotesService.findAllTriageNotes(patientTriageNoteInput)
    if (patientTriageNotes) {
      return {
        ...patientTriageNotes,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'TriageNotes not found',
    });
  }

  @Query(returns => TriageNotePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getPatientTriageNote')
  async getTriageNotes(@Args('getPatientTriageNote') getPatientTriageNote: GetPatientTriageNote): Promise<TriageNotePayload> {
    const triageNotes = await this.triageNotesService.GetTriageNotes(getPatientTriageNote.id)
    return {
      triageNotes,
      response: { status: 200, message: 'Patient Triage Notes fetched successfully' }
    };
  }

  @Mutation(() => TriageNotePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removePatientTriageNote')
  async removePatientTriageNote(@Args('removeTriageNote') removeTriageNote: RemoveTriageNote) {
    await this.triageNotesService.removeTriageNotes(removeTriageNote);
    return { response: { status: 200, message: 'Patient Triage Notes Deleted' } };
  }

  @ResolveField(() => Appointment)
  async appointment(@Parent() triageNotes: TriageNotes): Promise<Appointment> {
    if (triageNotes && triageNotes.appointmentId) {
      return await this.appointmentService.findOne(triageNotes.appointmentId);
    }
  }

  @ResolveField(() => Patient)
  async patient(@Parent() triageNotes: TriageNotes): Promise<Patient> {
    if (triageNotes && triageNotes.patientId) {
      return await this.patientService.findOne(triageNotes.patientId);
    }
  }
}
