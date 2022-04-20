import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/appointments/services/appointment.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PatientService } from 'src/patients/services/patient.service';
import { StaffService } from 'src/providers/services/staff.service';
import { UtilsService } from 'src/util/utils.service';
import { In, Repository } from 'typeorm';
import { CreateReactionInput } from '../dto/create-reaction.input';
import { RemoveReaction, UpdateReactionInput } from '../dto/update-reaction.input';
import { Reactions } from '../entities/reactions.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reactions)
    private reactionsRepository: Repository<Reactions>,
    private readonly paginationService: PaginationService,
    private readonly appointmentService: AppointmentService,
    private readonly staffService: StaffService,
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService
  ) { }


  async addReaction(createReactionInput: CreateReactionInput): Promise<Reactions> {
    try {
      //create reaction
      const reactionInstance =  this.reactionsRepository.create(createReactionInput)
      //save reaction
      const reaction = await this.reactionsRepository.save(reactionInstance)
      return reaction
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateReaction(updateReactionInput: UpdateReactionInput): Promise<Reactions> {
    try {
      return await this.utilsService.updateEntityManager(Reactions, updateReactionInput.id, updateReactionInput, this.reactionsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async findOne(id: string): Promise<Reactions> {
    const reaction = await this.reactionsRepository.findOne(id);
    if(reaction){
      return reaction
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Reaction not found',
    });
  }

  async getReactions(reactionsIds: string[]): Promise<Reactions[]>{
    return await this.reactionsRepository.find({
      where: {
        id: In(reactionsIds)
      }
    });
  }

  async GetReaction(id: string): Promise<Reactions> {
    return await this.findOne(id);
  }

  async removePatientVital({ id }: RemoveReaction) {
    try {
      await this.reactionsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
