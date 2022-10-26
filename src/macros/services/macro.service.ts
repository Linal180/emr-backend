import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateMacroInput, UpdateMacroInput } from '../dto/create-macro.input';
import { MacroPaginationInput } from '../dto/macros-input.dto';
import { MacrosPayload } from '../dto/macros-payload.dto';
import { Macros } from '../entities/macro.entity';

@Injectable()
export class MacroService {
  constructor(
    @InjectRepository(Macros)
    private macroRepository: Repository<Macros>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Finds all
   * @param macroInput 
   * @returns all 
   */
  async findAll(macroInput: MacroPaginationInput): Promise<MacrosPayload> {
    try {
      const { searchString } = macroInput
      const paginationResponse = await this.paginationService.willPaginate<Macros>(this.macroRepository, { ...macroInput, associatedTo: 'Macros', associatedToField: { columnValue: searchString, columnName: 'shortcut', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        macros: paginationResponse.data,
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
  async findOne(id: string): Promise<Macros> {
    return await this.macroRepository.findOne({ id })
  }

  /**
   * Creates mvx service
   * @param params 
   * @returns create 
   */
  async create(params: CreateMacroInput): Promise<Macros> {
    try {
      const { expansion, section, shortcut } = params;
      const macroInstance = this.macroRepository.create(params)
      return await this.macroRepository.save(macroInstance)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Updates mvx service
   * @param params 
   * @returns update 
   */
  async update(params: UpdateMacroInput): Promise<Macros> {
    try {
      const macroInstance = await this.utilsService.updateEntityManager(Macros, params.id, params, this.macroRepository)
      return await this.macroRepository.save(macroInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes mvx service
   * @param id 
   * @returns remove 
   */
  async remove(id: string): Promise<Macros> {
    try {
      const macroInstance = await this.findOne(id);
      await this.macroRepository.delete(id);
      return macroInstance;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}
