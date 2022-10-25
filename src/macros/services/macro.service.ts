import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { Repository } from 'typeorm';
import { MacroPaginationInput } from '../dto/macros-input.dto';
import { MacrosPayload } from '../dto/macros-payload.dto';
import { Macros } from '../entities/macro.entity';

@Injectable()
export class MacroService {
  constructor(
    @InjectRepository(Macros)
    private macroRepository: Repository<Macros>,
    private readonly paginationService: PaginationService,
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

}
