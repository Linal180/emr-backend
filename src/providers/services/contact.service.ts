import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoveContact, UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateContactInput } from '../dto/create-contact.input';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
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
