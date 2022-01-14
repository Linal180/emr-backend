import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
import { ContactService } from 'src/providers/services/contact.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateFacilityInput } from './dto/create-facility.input';
import { FacilitiesPayload } from './dto/facilities-payload.dto';
import FacilityInput from './dto/facility-input.dto';
import { FacilityPayload } from './dto/facility-payload.dto';
import { UpdateFacilityInput } from './dto/update-facility.input';
import { RemoveFacility } from './dto/update-facilityItem.input';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
    private readonly paginationService: PaginationService,
    private readonly contactService: ContactService,
    private readonly billingAddressService: BillingAddressService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates facility
   * @param createFacilityInput 
   * @returns facility 
   */
  async createFacility(createFacilityInput: CreateFacilityInput): Promise<Facility> {
    try {
      //creating facility
      const facilityInstance = this.facilityRepository.create(createFacilityInput.createFacilityItemInput)
      //adding contact
      const contact = await this.contactService.createContact(createFacilityInput.createContactInput)
      facilityInstance.contacts = [contact];
      //adding billing address details
      const billingAddress = await this.billingAddressService.createBillingAddress(createFacilityInput.createBillingAddressInput)
      facilityInstance.billingAddress = [billingAddress]
      const facility = await this.facilityRepository.save(facilityInstance);
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
      facilityInput.isPrivate = true;
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
   * Finds one
   * @param id 
   * @returns one 
   */
  async GetFacility(id: string): Promise<FacilityPayload> {
    const facility = await this.findOne(id);
    if (facility) {
      return { facility }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Facility not found',
    });
  }

  /**
   * Updates facility
   * @param updateFacilityInput 
   * @returns facility 
   */
  async updateFacility(updateFacilityInput: UpdateFacilityInput): Promise<Facility> {
    try {
      const facility = await this.facilityRepository.save(updateFacilityInput.updateFacilityItemInput)
      //updating contact details
      await this.contactService.updateContact(updateFacilityInput.updateContactInput)
      //updating billing details
      await this.billingAddressService.updateBillingAddress(updateFacilityInput.updateBillingAddressInput)
      return facility
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
