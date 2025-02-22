import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
//services
import { UtilsService } from 'src/util/utils.service';
import { PracticeService } from 'src/practice/practice.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { ContactService } from 'src/providers/services/contact.service';
import { BillingAddressService } from 'src/providers/services/billing-address.service';
//inputs
import { RemoveFacility } from '../dto/update-facilityItem.input';
import { UpdateFacilityInput } from '../dto/update-facility.input';
import { CreateFacilityInput } from '../dto/create-facility.input';
import { CreatePracticeInput } from 'src/practice/dto/create-practice.input';
import { UpdateFacilityTimeZoneInput } from '../dto/update-facilityTimeZone.input';
//payloads
import FacilityInput from '../dto/facility-input.dto';
import { FacilityPayload } from '../dto/facility-payload.dto';
import { FacilitiesPayload } from '../dto/facilities-payload.dto';
//entities
import { Facility } from '../entities/facility.entity';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,
    private readonly utilsService: UtilsService,
    private readonly paginationService: PaginationService,
    private readonly billingAddressService: BillingAddressService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => PracticeService))
    private readonly practiceService: PracticeService,
  ) { }

  /** 
   * Creates facility
   * @param createFacilityInput 
   * @returns facility 
   */
  async createFacility(createFacilityInput: CreateFacilityInput): Promise<Facility> {
    try {
      //get practice
      const practice = await this.practiceService.findOne(createFacilityInput.createFacilityItemInput.practiceId)
      //creating facility
      const facilityInstance = this.facilityRepository.create(createFacilityInput.createFacilityItemInput)
      facilityInstance.practice = practice;
      facilityInstance.practiceId = practice.id;
      //adding contact
      if (createFacilityInput.createContactInput) {
        const contact = await this.contactService.createContact(createFacilityInput.createContactInput)
        facilityInstance.contacts = [contact];
      }
      //adding billing address details
      if (createFacilityInput.createBillingAddressInput) {
        const billingAddress = await this.billingAddressService.createBillingAddress(createFacilityInput.createBillingAddressInput)
        facilityInstance.billingAddress = [billingAddress]
      }
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
        facilities: paginationResponse.data,
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
    const facility = await this.facilityRepository.findOne(id);
    if (facility) {
      return facility
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Facility not found',
    });
  }

  /**
   * Adds facility
   * @param createPracticeInput 
   * @returns facility 
   */
  async addFacility(createPracticeInput: CreatePracticeInput): Promise<Facility> {
    try {
      //adding new facility
      const facilityInstance = this.facilityRepository.create({ ...createPracticeInput.createFacilityItemInput, isPrimary: true })
      //adding contact
      if (createPracticeInput.createContactInput) {
        const contact = await this.contactService.createContact({ ...createPracticeInput.createFacilityContactInput, primaryContact: true })
        facilityInstance.contacts = [contact];
      }
      const facility = await this.facilityRepository.save(facilityInstance);
      return facility
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
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
  }


  /**
   * Updates facility
   * @param updateFacilityInput 
   * @returns facility 
   */
  async updateFacility(updateFacilityInput: UpdateFacilityInput): Promise<Facility> {
    try {
      //update facility 
      await this.utilsService.updateEntityManager(Facility, updateFacilityInput.updateFacilityItemInput.id, updateFacilityInput.updateFacilityItemInput, this.facilityRepository)
      //get practice
      const practice = await this.practiceService.findOne(updateFacilityInput.updateFacilityItemInput.practiceId)
      const facilityInstance = await this.findOne(updateFacilityInput.updateFacilityItemInput.id)
      facilityInstance.practice = practice;
      //updating contact details
      const contact = await this.contactService.updateContact(updateFacilityInput.updateContactInput)
      facilityInstance.contacts = [contact]
      //updating billing details
      const billingAddress = await this.billingAddressService.updateBillingAddress(updateFacilityInput.updateBillingAddressInput)
      facilityInstance.billingAddress = [billingAddress]
      const facility = await this.facilityRepository.save(facilityInstance)
      return facility
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  /**
 * Updates facility
 * @param updateFacilityTimeZoneInput 
 * @returns facility 
 */
  async updateFacilityTimeZone(updateFacilityTimeZoneInput: UpdateFacilityTimeZoneInput): Promise<Facility> {
    try {
      return this.facilityRepository.save(updateFacilityTimeZoneInput)
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

  /**
   * Gets practice facility count
   * @param practiceId 
   * @returns  
   */
  async getPracticeFacilityCount(practiceId: string) {
    return await this.facilityRepository.count({ where: { practiceId } })
  }


  /**
   * Gets practice facilities
   * @param practiceId 
   * @returns  
   */
  async getPracticeFacilities(practiceId: string) {
    return await this.facilityRepository.find({ where: { practiceId }, select: ['id', 'name'] })
  }

  /**
   * Gets practice facilities appointments
   * @param practiceId 
   * @returns  
   */
  async getPracticeFacilitiesAppointments(practiceId: string) {
    return await this.facilityRepository.find({ where: { practiceId }, select: ['id', 'name'] })
  }
}
