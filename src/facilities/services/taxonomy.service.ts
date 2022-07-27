import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { In, Repository } from 'typeorm';
import { ServicePayload } from '../dto/service-payload.dto';
import TaxonomyInput from '../dto/taxonomies-input.dto';
import { TaxonomyPayload } from '../dto/taxonomies-payload.dto';
import { RemoveService } from '../dto/update-service.input';
import { Taxonomy } from '../entities/taxonomy.entity';
import { FacilityService } from './facility.service';

@Injectable()
export class TaxonomiesService {
  constructor(
    @InjectRepository(Taxonomy)
    private taxonomiesRepository: Repository<Taxonomy>,
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }


  /**
   * Finds all taxonomies
   * @param taxonomyInput 
   * @returns all taxonomies 
   */
  async findAllTaxonomies(taxonomyInput: TaxonomyInput): Promise<TaxonomyPayload> {
    try {
      const [first] = taxonomyInput.searchString ? taxonomyInput.searchString.split(' ') : ''
      const paginationResponse = await this.paginationService.willPaginate<Taxonomy>(this.taxonomiesRepository, { ...taxonomyInput, associatedTo: 'Taxonomy', associatedToField: { columnValue: first, columnName: 'code', columnName2: 'specialization', columnName3: 'classification', filterType: 'stringFilter' } })
      return {
        taxonomies: paginationResponse.data,
        pagination: {
          ...paginationResponse
        },
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
  async findOne(id: string): Promise<Taxonomy> {
    return await this.taxonomiesRepository.findOne(id);
  }

  /**
   * Finds by ids
   * @param taxonomiesIds 
   * @returns by ids 
   */
  async findByIds(taxonomiesIds: string[]): Promise<Taxonomy[]> {
    return await this.taxonomiesRepository.find({
      where: {
        id: In(taxonomiesIds)
      }
    });
  }

  /**
   * Removes service
   * @param { id } 
   */
  async removeService({ id }: RemoveService) {
    try {
      await this.taxonomiesRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
