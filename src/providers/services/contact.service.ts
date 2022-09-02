import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { RemoveContact, UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UsersService } from 'src/users/services/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import ContactInput from '../dto/contact-input.dto';
import { ContactsPayload } from '../dto/contacts-payload.dto';
import { CreateContactInput } from '../dto/create-contact.input';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates contact
   * @param createContactInput 
   * @returns contact 
   */
  async createContact(createContactInput: CreateContactInput): Promise<Contact> {
    try {
      // create contact for user
      const contactInstance = this.contactRepository.create(createContactInput)
      //fetch user
      if (createContactInput.userId) {
        const user = await this.usersService.findUserById(createContactInput.userId)
        contactInstance.userId = user.id
      }
      //fetch user
      if (createContactInput.facilityId) {
        const facility = await this.facilityService.findOne(createContactInput.facilityId)
        contactInstance.facility = facility
      }
      return await this.contactRepository.save(contactInstance);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates contact
   * @param updateContactInput 
   * @returns contact 
   */
  async updateContact(updateContactInput: UpdateContactInput): Promise<Contact> {
    try {
      if (updateContactInput.id) {
        return await this.utilsService.updateEntityManager(Contact, updateContactInput.id, updateContactInput, this.contactRepository)
      }
      const contactInstance = this.contactRepository.create(updateContactInput)
      return await this.contactRepository.save(contactInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all contacts
   * @param contactInput 
   * @returns all contacts 
   */
  async findAllContacts(contactInput: ContactInput): Promise<ContactsPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Contact>(this.contactRepository, contactInput)
      return {
        pagination: {
          ...paginationResponse
        },
        contacts: paginationResponse.data,
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
  async findOne(id: string): Promise<Contact> {
    return await this.contactRepository.findOne(id);
  }

  /**
   * Finds contacts by patient id
   * @param id 
   * @returns contacts by patient id 
   */
  async findContactsByPatientId(id: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: {
        patientId: id
      }
    });
  }

  /**
   * Finds contacts by facility id
   * @param id 
   * @returns contacts by facility id 
   */
  async findContactsByFacilityId(id: string): Promise<Contact[]> {
    return await this.contactRepository.find({
      where: {
        facilityId: id
      }
    });
  }

  /**
   * Removes contact
   * @param { id } 
   */
  async removeContact({ id }: RemoveContact) {
    try {
      await this.contactRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Removes patient contacts
   * @param { id } 
   */
  async removePatientContacts({ id }: RemoveContact) {
    try {
      const entities = await this.contactRepository.find({ patientId: id })
      await this.contactRepository.remove(entities)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
