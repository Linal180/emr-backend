import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//services
import { UtilsService } from 'src/util/utils.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { AppointmentService } from 'src/appointments/services/appointment.service';
//inputs
import PatientTriageNoteInput from '../dto/triageNotes-input.dto';
import { CreateTriageNoteInput } from '../dto/create-triageNote.input';
import { RemoveTriageNote, UpdateTriageNoteInput } from '../dto/update-triageNote.input';
//entities
import { TriageNotes } from '../entities/triageNotes.entity';
//payloads
import { TriageNotesPayload } from '../dto/triageNote-payload.dto';
@Injectable()
export class TriageNotesService {
  constructor(
    @InjectRepository(TriageNotes)
    private triageNotesRepository: Repository<TriageNotes>,
    private readonly utilsService: UtilsService,
    private readonly patientService: PatientService,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
  ) { }


  async addTriageNotes(createTriageNoteInput: CreateTriageNoteInput): Promise<TriageNotes> {
    try {
      //create patient triageNote instance
      const triageNoteInstance = this.triageNotesRepository.create(createTriageNoteInput)
      //get appointment & associate with triageNote
      if (createTriageNoteInput.appointmentId) {
        const appointment = await this.appointmentService.findOne(createTriageNoteInput.appointmentId)
        triageNoteInstance.appointment = appointment
      }
      //get patient & associate with triageNote
      if (createTriageNoteInput.patientId) {
        const patient = await this.patientService.findOne(createTriageNoteInput.patientId)
        triageNoteInstance.patient = patient
      }
      //save the triageNote in db
      const triageNote = await this.triageNotesRepository.save(triageNoteInstance)
      return triageNote
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates patient triageNote
   * @param updateTriageNoteInput 
   * @returns patient triageNote 
   */
  async updateTriageNotes(updateTriageNoteInput: UpdateTriageNoteInput): Promise<TriageNotes> {
    try {
      return await this.utilsService.updateEntityManager(TriageNotes, updateTriageNoteInput.id, updateTriageNoteInput, this.triageNotesRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all patient triageNotes
   * @param triageNoteInput 
   * @returns all patient triageNotes 
   */
  async findAllTriageNotes(triageNoteInput: PatientTriageNoteInput): Promise<TriageNotesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<TriageNotes>(this.triageNotesRepository, triageNoteInput)
      return {
        pagination: {
          ...paginationResponse
        },
        triageNotes: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPatientTriageNotes(patientId: string) {
    return this.triageNotesRepository.find({
      where: {
        patientId
      }
    })
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<TriageNotes> {
    const triageNote = await this.triageNotesRepository.findOne(id);
    if (triageNote) {
      return triageNote
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Patient TriageNote not found',
    });
  }

  /**
   * Gets patient triageNote
   * @param id 
   * @returns patient triageNote 
   */
  async GetTriageNotes(id: string): Promise<TriageNotes> {
    return await this.findOne(id);
  }

  /**
   * Removes patient triageNote
   * @param { id } 
   */
  async removeTriageNotes({ id }: RemoveTriageNote) {
    try {
      await this.triageNotesRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
