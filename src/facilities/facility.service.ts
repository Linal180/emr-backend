import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateFacilityInput } from './dto/create-facility.input';
import { FacilitiesPayload } from './dto/facilities-payload.dto';
import { Facility } from './entities/facility.entity';
import FacilityInput from './dto/facility-input.dto';
import { RemoveFacility, UpdateFacilityInput } from './dto/update-facility.input';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates facility
   * @param createFacilityInput 
   * @returns facility 
   */
  async createFacility(createFacilityInput: CreateFacilityInput): Promise<Facility> {
    try {
      // Facility Creation
      const facility = this.facilityRepository.create(createFacilityInput)
      return await this.facilityRepository.save(facility);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all facilities
   * @param facilityInput 
   * @returns all facilities 
   */
  async findAllFacilities(facilityInput: FacilityInput): Promise<FacilitiesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Facility>(this.facilityRepository, facilityInput)
      return {
        pagination: {
          ...paginationResponse
        },
        facility: paginationResponse.data,
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
  async findOne(id: string): Promise<Facility> {
    return await this.facilityRepository.findOne(id);
  }

  /**
   * Updates facility
   * @param updateFacilityInput 
   * @returns facility 
   */
  async updateFacility(updateFacilityInput: UpdateFacilityInput): Promise<Facility> {
    try {
      return await this.utilsService.updateEntityManager(Facility, updateFacilityInput.id, updateFacilityInput, this.facilityRepository)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes facility
   * @param { id } 
   */
  async removeFacility({ id }: RemoveFacility) {
    try {
      await this.facilityRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
