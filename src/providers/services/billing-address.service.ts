import { forwardRef, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RemoveBillingAddress, UpdateBillingAddressInput } from 'src/facilities/dto/update-billing-address.input';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateBillingAddressInput } from '../dto/create-billing-address.input';
import { BillingAddress } from '../entities/billing-address.entity';

@Injectable()
export class BillingAddressService {
  constructor(
    @InjectRepository(BillingAddress)
    private billingAddressRepository: Repository<BillingAddress>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) { }

  /**
   * Creates contact
   * @param createContactInput 
   * @returns contact 
   */
  async createBillingAddress(createBillingAddressInput: CreateBillingAddressInput): Promise<BillingAddress> {
    try {
      // create billing address for user
      const billingAddressInstance = this.billingAddressRepository.create(createBillingAddressInput)
      //fetch user
      if (createBillingAddressInput.userId) {
        const user = await this.usersService.findUserById(createBillingAddressInput.userId)
        billingAddressInstance.userId = user.id
      }
      return await this.billingAddressRepository.save(billingAddressInstance);
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
      if(updateBillingAddressInput.id){
        return await this.billingAddressRepository.save(updateBillingAddressInput)
      }
      const billingAddressInstance = this.billingAddressRepository.create(updateBillingAddressInput)
      return await this.billingAddressRepository.save(billingAddressInstance)
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
