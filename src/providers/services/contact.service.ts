import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { PatientService } from 'src/patients/services/patient.service';
import { RemoveContact, UpdateContactInput } from 'src/providers/dto/update-contact.input';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { CreateContactInput } from '../dto/create-contact.input';
import { Contact } from '../entities/contact.entity';
import { DoctorService } from './doctor.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => PatientService))
    private readonly patientService: PatientService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates contact
   * @param createContactInput 
   * @returns contact 
   */
  async createContact(createContactInput: CreateContactInput): Promise<Contact> {
    try {
      console.log("createContactInput", createContactInput);

      //fetch facility
      const facility = await this.facilityService.findOne(createContactInput.facilityId)
      // create contact for user
      const contact = this.contactRepository.create(createContactInput)
      contact.faciltiy = facility
      //fetch doctor
      if (createContactInput.doctorId) {
        const doctor = await this.doctorService.findOne(createContactInput.doctorId)
        contact.doctor = doctor
      }
      //fetch user
      if (createContactInput.userId) {
        const user = await this.usersService.findUserById(createContactInput.userId)
        contact.userId = user.id
      }
      //fetch patient
      if (createContactInput.patientId) {
        console.log("createContactInput.patient", createContactInput.patientId);

        const patient = await this.patientService.findOne(createContactInput.patientId)
        contact.patient = patient
      }

      console.log("contact......", contact)
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
