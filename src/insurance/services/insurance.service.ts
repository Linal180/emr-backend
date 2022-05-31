import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { InsurancePaginationInput } from '../dto/insurances-input.dto';
import { InsurancesPayload } from '../dto/insurances-payload.dto';
import { Insurance } from '../entities/insurance.entity';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private insuranceRepository: Repository<Insurance>,
    private readonly paginationService: PaginationService,
  ) { }

  /**
   * Finds all
   * @param insuranceInput 
   * @returns all 
   */
  async findAll(insuranceInput: InsurancePaginationInput): Promise<InsurancesPayload> {
    try {
      const { searchString } = insuranceInput
      const paginationResponse = await this.paginationService.willPaginate<Insurance>(this.insuranceRepository, { ...insuranceInput, associatedTo: 'Insurance', associatedToField: { columnValue: searchString, columnName: 'payerName', columnName2: 'payerId', columnName3: 'lineOfBusiness', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        insurances: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Finds by payer name or id
   * @param searchTerm 
   * @returns by payer name or id 
   */
  async findByPayerNameOrId(searchTerm: string): Promise<Insurance[]> {
    const [id, name] = searchTerm.split(' ');

    const insurances = await this.insuranceRepository.find({
      payerId: Like(`%${id}%`),
      payerName: Like(`%${name}%`)
    });

    if (!insurances.length) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Insurance not found',
      });
    }

    return insurances;
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  findOne(id: string): Promise<Insurance> {
    return this.insuranceRepository.findOne({ id })
  }
}
