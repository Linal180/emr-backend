import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTriageNoteInput } from '../dto/create-triageNote.input';
import { TriageNotePayload, TriageNotesPayload } from '../dto/triageNote-payload.dto';
import PatientTriageNoteInput from '../dto/triageNotes-input.dto';
import { GetPatientTriageNote, RemoveTriageNote, UpdateTriageNoteInput } from '../dto/update-triageNote.input';
import { TriageNotes } from '../entities/triageNotes.entity';
import { TriageNotesService } from '../services/triageNotes.service';

@Resolver(() => TriageNotes)
export class TriageNotesResolver {
  constructor(private readonly triageNotesService: TriageNotesService) { }

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
      response: { status: 200, message: 'Patient vital fetched successfully' }
    };
  }

  @Mutation(() => TriageNotePayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'removePatientTriageNote')
  async removePatientTriageNote(@Args('removeTriageNote') removeTriageNote: RemoveTriageNote) {
    await this.triageNotesService.removeTriageNotes(removeTriageNote);
    return { response: { status: 200, message: 'Patient vital Deleted' } };
  }
}
