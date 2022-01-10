import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoveBillingAddress, UpdateBillingAddressInput } from 'src/facilities/dto/update-billing-address.input';
import { FacilityService } from 'src/facilities/facility.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBillingAddressInput } from '../dto/create-billing-address.input';
import { BillingAddress } from '../entities/billing-address.entity';
import { DoctorService } from './doctor.service';

@Injectable()
export class BillingAddressService {
  constructor(
    @InjectRepository(BillingAddress)
    private billingAddressRepository: Repository<BillingAddress>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    @Inject(forwardRef(() => DoctorService))
    private readonly doctorService: DoctorService,
  ) { }

  /**
   * Creates contact
   * @param createContactInput 
   * @returns contact 
   */
  async createBillingAddress(createBillingAddressInput: CreateBillingAddressInput): Promise<BillingAddress> {
    try {
      //fetch facility
      const facility = await this.facilityService.findOne(createBillingAddressInput.facilityId)
      // create billing address for user
      const billingAddress = this.billingAddressRepository.create(createBillingAddressInput)
      billingAddress.faciltiy = facility
      //fetch user
      if (createBillingAddressInput.userId) {
        const user = await this.usersService.findUserById(createBillingAddressInput.userId)
        billingAddress.userId = user.id
      }
      //fetch doctor
      if (createBillingAddressInput.doctorId) {
        const doctor = await this.doctorService.findOne(createBillingAddressInput.doctorId)
        billingAddress.doctor = doctor
      }
      return await this.billingAddressRepository.save(billingAddress);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates billing address
   * @param updateBillingAddressInput 
   * @returns billing address 
   */
  async updateBillingAddress(updateBillingAddressInput: UpdateBillingAddressInput): Promise<BillingAddress> {
    try {
      return await this.billingAddressRepository.save(updateBillingAddressInput)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<BillingAddress> {
    return await this.billingAddressRepository.findOne(id);
  }

  /**
   * Removes billing address
   * @param { id } 
   */
  async removeBillingAddress({ id }: RemoveBillingAddress) {
    try {
      await this.billingAddressRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
