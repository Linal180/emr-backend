import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateFacilityInput } from './dto/create-facility.input';
import { FacilitiesPayload } from './dto/facilities-payload.dto';
import { Facility } from './entities/facility.entity';
import FacilityInput from './dto/facility-input.dto';
import { RemoveFacility, UpdateFacilityInput } from './dto/update-facility.input';
import { ContactService } from 'src/providers/services/contact.service';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
    private readonly paginationService: PaginationService,
    private readonly contactService: ContactService,
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
      const facilityInstance = this.facilityRepository.create(createFacilityInput)
      const facility = await this.facilityRepository.save(facilityInstance);
      //create contact detail of facility
      const createContactInput: CreateContactInput = { ...createFacilityInput, facility: facility }
      await this.contactService.createContact(createContactInput)
      return facility
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
      const faciltiy = await this.facilityRepository.save(updateFacilityInput)
      const UpdateContactInput: UpdateContactInput = { ...updateFacilityInput, facilityId: updateFacilityInput.id }
      await this.contactService.updateContact(UpdateContactInput)
      return faciltiy
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
