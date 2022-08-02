import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
//entities
import { Modifier } from "../entities/modifier.entity";
//inputs, payloads
import { AllModifiersPayload } from "../dto/modifiers-payload.dto";
import {
  CreateModifierInput, FindAllModifierInput, GetModifierInput, RemoveModifierInput, UpdateModifierInput
} from "../dto/modifiers.input";
//services
import { UtilsService } from "src/util/utils.service";
import { PaginationService } from "src/pagination/pagination.service";

@Injectable()
export class ModifierService {
  constructor(@InjectRepository(Modifier) private modifierRepository: Repository<Modifier>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Finds all modifiers
   * @param params 
   * @returns all modifiers 
   */
  async findAllModifiers(params: FindAllModifierInput): Promise<AllModifiersPayload> {
    try {
      const { paginationOptions, searchQuery } = params
      const paginationResponse = await this.paginationService.willPaginate<Modifier>(this.modifierRepository, { paginationOptions })
      return {
        pagination: {
          ...paginationResponse
        },
        modifiers: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one
   * @param params 
   * @returns one 
   */
  async findOne(params: GetModifierInput): Promise<Modifier> {
    const { id } = params;
    return await this.modifierRepository.findOne(id)
  }

  /**
   * Finds modifier by code
   * @param codeName 
   * @returns modifier by code 
   */
  async findModifierByCode(codeName: string): Promise<Modifier> {
    return await this.modifierRepository.findOne({ code: codeName })
  }

  /**
   * Creates modifier service
   * @param params 
   * @returns create 
   */
  async create(params: CreateModifierInput): Promise<Modifier> {
    try {
      const feeSchedule = this.modifierRepository.create(params);
      return await this.modifierRepository.save(feeSchedule)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates modifier
   * @param params 
   * @returns modifier 
   */
  async updateModifier(params: UpdateModifierInput): Promise<Modifier> {
    try {
      const modifier = await this.utilsService.updateEntityManager(Modifier, params.id, params, this.modifierRepository)
      return await this.modifierRepository.save(modifier)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes modifier service
   * @param params 
   * @returns remove 
   */
  async remove(params: RemoveModifierInput): Promise<Modifier> {
    try {
      const { id } = params;
      const modifier = await this.modifierRepository.findOne(id);
      if (!modifier) throw new NotFoundException({ status: HttpStatus.NOT_FOUND, error: 'Modifier not found' })
      await this.modifierRepository.delete(id);
      return modifier
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}