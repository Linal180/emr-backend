import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { In, Repository } from 'typeorm';
import { CreateReactionInput } from '../dto/create-reaction.input';
import ReactionInput from '../dto/reaction-input.dto';
import { ReactionsPayload } from '../dto/reactions-payload.dto';
import { RemoveReaction, UpdateReactionInput } from '../dto/update-reaction.input';
import { Reactions } from '../entities/reactions.entity';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reactions)
    private reactionsRepository: Repository<Reactions>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService
  ) { }


  /**
   * Adds reaction
   * @param createReactionInput 
   * @returns reaction 
   */
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

  /**
   * Updates reaction
   * @param updateReactionInput 
   * @returns reaction 
   */
  async updateReaction(updateReactionInput: UpdateReactionInput): Promise<Reactions> {
    try {
      return await this.utilsService.updateEntityManager(Reactions, updateReactionInput.id, updateReactionInput, this.reactionsRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds all reactions
   * @param reactionInput 
   * @returns all reactions 
   */
  async findAllReactions(reactionInput: ReactionInput): Promise<ReactionsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Reactions>(this.reactionsRepository, reactionInput)
      return {
        pagination: {
          ...paginationResponse
        },
        reactions: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
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

  /**
   * Gets reactions
   * @param reactionsIds 
   * @returns reactions 
   */
  async getReactions(reactionsIds: string[]): Promise<Reactions[]>{
    return await this.reactionsRepository.find({
      where: {
        id: In(reactionsIds)
      }
    });
  }

  /**
   * Gets reaction
   * @param id 
   * @returns reaction 
   */
  async GetReaction(id: string): Promise<Reactions> {
    return await this.findOne(id);
  }

  /**
   * Removes patient vital
   * @param { id } 
   */
  async removePatientVital({ id }: RemoveReaction) {
    try {
      await this.reactionsRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
