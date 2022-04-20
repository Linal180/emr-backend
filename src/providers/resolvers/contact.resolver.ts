import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import ContactInput from '../dto/contact-input.dto';
import { ContactPayload } from '../dto/contact-payload.dto';
import { ContactsPayload } from '../dto/contacts-payload.dto';
import { CreateContactInput } from '../dto/create-contact.input';
import { GetContact, RemoveContact, UpdateContactInput } from '../dto/update-contact.input';
import { ContactService } from '../services/contact.service';

@Resolver('contact')
export class ContactResolver {
  constructor(private readonly contactService: ContactService) { }

  @Mutation(() => ContactPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createContact')
  async createContact(@Args('createContactInput') createContactInput: CreateContactInput) {
    return {
      contact: await this.contactService.createContact(createContactInput),
      response: { status: 200, message: 'Contact created successfully' }
    };
  }

  @Mutation(() => ContactPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateContact')
  async updateContact(@Args('updateContactInput') updateContactInput: UpdateContactInput) {
    return {
      contact: await this.contactService.updateContact(updateContactInput),
      response: { status: 200, message: 'Contact updated successfully' }
    };
  }

  @Query(returns => ContactsPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllContacts')
  async findAllContacts(@Args('contactInput') contactInput: ContactInput): Promise<ContactsPayload> {
    contactInput.primaryContact = false;
    const contacts = await this.contactService.findAllContacts(contactInput)
    if (contacts) {
      return {
        ...contacts,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Contacts not found',
    });
  }

  @Query(returns => ContactPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getContact')
  async getContact(@Args('getContact') getContact: GetContact): Promise<ContactPayload> {
    return {
      contact: await this.contactService.findOne(getContact.id),
      response: { status: 200, message: 'Contact fetched successfully' }
    };
  }

  @Mutation(() => ContactPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeContact')
  async removeContact(@Args('removeContact') removeContact: RemoveContact) {
    await this.contactService.removeContact(removeContact);
    return { response: { status: 200, message: 'Contact Deleted' } };
  }
}
