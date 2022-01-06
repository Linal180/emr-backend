import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Contact } from '../entities/contact.entity';
import { CreateContactInput } from '../dto/create-contact.input';
import { RemoveContact, UpdateContactInput } from 'src/facilities/dto/update-contact.input';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates contact
   * @param createContactInput 
   * @returns contact 
   */
  async createContact(createContactInput: CreateContactInput): Promise<Contact> {
    try {
      console.log("createContactInput", createContactInput)
      //fetch user
      if (createContactInput.userId) {
        const user = await this.usersService.findOne(createContactInput.userId)
        createContactInput.userId = user.id
      }
      // create contact for user
      const contact = this.contactRepository.create(createContactInput)
      return await this.contactRepository.save(contact);
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
      return await this.contactRepository.save(updateContactInput)
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
}
