import { ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { Connection, Repository } from 'typeorm';
import { AllDoctorPayload } from '../dto/all-doctor-payload.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import DoctorInput from '../dto/doctor-input.dto';
import { UpdateDoctorInput } from '../dto/update-doctor.input';
import { DisableDoctor, RemoveDoctor } from '../dto/update-doctorItem.input';
import { Doctor } from '../entities/doctor.entity';
import { BillingAddressService } from './billing-address.service';
import { ContactService } from './contact.service';
import { CreateDoctorItemInput } from '../dto/create-doctorItem.input ';
import { CreatePracticeDoctorInput } from '../dto/create-practice-doctor.input';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly connection: Connection,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => ContactService))
    private readonly contactService: ContactService,
    @Inject(forwardRef(() => BillingAddressService))
    private readonly billingAddressService: BillingAddressService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) { }

  /**
   * Creates doctor
   * @param createDoctorInput 
   * @returns doctor 
   */
  async createDoctor(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // register doctor as user -
      const user = await this.usersService.create(createDoctorInput.createDoctorItemInput)
      //get facility 
      const facility = await this.facilityService.findOne(createDoctorInput.createDoctorItemInput.facilityId)
      // Doctor Creation
      const doctorInstance = this.doctorRepository.create(createDoctorInput.createDoctorItemInput)
      doctorInstance.user = user;
      doctorInstance.facility = facility;
      doctorInstance.facilityId = facility.id
      //adding contact
      if(createDoctorInput.createContactInput){
      const contact = await this.contactService.createContact(createDoctorInput.createContactInput)
      doctorInstance.contacts = [contact]
      }
      //adding billing address details
      if(createDoctorInput.createBillingAddressInput){
      const billingAddress = await this.billingAddressService.createBillingAddress(createDoctorInput.createBillingAddressInput)
      doctorInstance.billingAddress = [billingAddress]
      }
      const doctor = await queryRunner.manager.save(doctorInstance);
      await queryRunner.commitTransaction();
      return doctor
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates doctor
   * @param updateDoctorInput 
   * @returns doctor 
   */
  async updateDoctor(updateDoctorInput: UpdateDoctorInput): Promise<Doctor> {
    try {
      const doctor = await this.doctorRepository.save(updateDoctorInput.updateDoctorItemInput)
      //updating contact details
      await this.contactService.updateContact(updateDoctorInput.updateContactInput)
      //updating billing details
      await this.billingAddressService.updateBillingAddress(updateDoctorInput.updateBillingAddressInput)
      return doctor
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async addDoctor(registerUserInput: RegisterUserInput, facilityId: string): Promise<Doctor> {
    try {
      // register doctor as user 
      const user = await this.usersService.create({...registerUserInput, facilityId})
      //get facility 
      const facility = await this.facilityService.findOne(facilityId)
      // Doctor Creation    
      const doctorInstance = this.doctorRepository.create(registerUserInput)
      doctorInstance.user = user;
      doctorInstance.facility = facility;
      doctorInstance.facilityId = facility.id
      return await this.doctorRepository.save(doctorInstance)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Params doctor service
   * @param doctorInput 
   * @returns all doctor 
   */
  async findAllDoctor(doctorInput: DoctorInput): Promise<AllDoctorPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Doctor>(this.doctorRepository, doctorInput)
      return {
        pagination: {
          ...paginationResponse
        },
        doctors: paginationResponse.data,
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
  async findOne(id: string): Promise<Doctor> {
    const doctor =  await this.doctorRepository.findOne(id);
    if(doctor){
      return doctor
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Doctor not found or disabled',
    });
  }

  async getDoctor(id: string): Promise<Doctor> {
    return await this.findOne(id);
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOneByEmail(email: string): Promise<Doctor> {
    return await this.doctorRepository.findOne(email);
  }

  /**
   * Removes doctor
   * @param { id } 
   */
  async removeDoctor({ id }: RemoveDoctor) {
    try {
      const doctor = await this.doctorRepository.findOne(id)
      if (doctor) {
        await this.doctorRepository.delete(id)
        await this.usersService.remove(doctor.user.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Doctor not found or disabled',
      });

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Disables doctor
   * @param { id } 
   */
  async disableDoctor({ id }: DisableDoctor) {
    try {
      await this.usersService.deactivateUser(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
