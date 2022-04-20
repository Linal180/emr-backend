import { forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/pagination/pagination.service';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { UsersService } from 'src/users/services/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Connection, Repository } from 'typeorm';
import { FacilityService } from '../../facilities/services/facility.service';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
import { CreateStaffInput } from '../dto/create-staff.input';
import StaffInput from '../dto/staff-input.dto';
import { DisableStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';
import { Staff } from '../entities/staff.entity';
import { DoctorService } from './doctor.service';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly connection: Connection,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    private readonly utilsService: UtilsService,
    private readonly doctorService: DoctorService
  ) { }

  /**
   * Creates staff
   * @param createStaffInput 
   * @returns staff 
   */
  async createStaff(createStaffInput: CreateStaffInput): Promise<Staff> {
    //Transaction start
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // register staff as user 
      const user = await this.usersService.create(createStaffInput.staffInput)
      //get facility 
      const facility = await this.facilityService.findOne(createStaffInput.staffInput.facilityId)
      // Staff Creation
      const providers = await this.doctorService.getDoctors(createStaffInput.providers)
      const staffInstance = this.staffRepository.create(createStaffInput.staffInput)
      staffInstance.providers = providers
      staffInstance.user = user;
      staffInstance.facility = facility;
      staffInstance.facilityId = facility.id
      const staff = await queryRunner.manager.save(staffInstance);
      await this.usersService.saveUserId(staff.id, user);
      await queryRunner.commitTransaction();
      return staff
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Updates staff
   * @param UpdateStaffInput 
   * @returns staff 
   */
  async updateStaff(updateStaffInput: UpdateStaffInput): Promise<Staff> {
    try {
       await this.utilsService.updateEntityManager(Staff, updateStaffInput.updateStaffItemInput.id, updateStaffInput.updateStaffItemInput, this.staffRepository)
       const staffInstance = await this.findOne(updateStaffInput.updateStaffItemInput.id)
       if(!staffInstance){
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Staff not found or disabled',
        });
       }
      // get providers
      const providers = await this.doctorService.getDoctors(updateStaffInput.providers)
      staffInstance.providers = providers
      return this.staffRepository.save(staffInstance)
      } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Adds staff
   * @param registerUserInput 
   * @param facilityId 
   * @returns staff 
   */
  async addStaff(registerUserInput: RegisterUserInput, facilityId: string, practiceId: string): Promise<Staff> {
    try {
      // register staff as user 
      const user = await this.usersService.create({ ...registerUserInput, facilityId })
      //get facility 
      const facility = await this.facilityService.findOne(facilityId)
      // Staff Creation
      const staffInstance = this.staffRepository.create({...registerUserInput, practiceId})
      staffInstance.user = user;
      staffInstance.facility = facility;
      staffInstance.facilityId = facility.id
      const staff =  await this.staffRepository.save(staffInstance)
      await this.usersService.saveUserId(staff.id, user);
      return staff
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all staff
   * @param staffInput 
   * @returns all staff 
   */
  async findAllStaff(staffInput: StaffInput): Promise<AllStaffPayload> {
    try {
      const [first]  = staffInput.searchString ? staffInput.searchString.split(' ') : ''
      const paginationResponse = await this.paginationService.willPaginate<Staff>(this.staffRepository, { ...staffInput, associatedTo: 'Staff', associatedToField: { columnValue: first, columnName: 'firstName', columnName2: 'lastName', columnName3: 'email', filterType: 'stringFilter' } })
      return {
        pagination: {
          ...paginationResponse
        },
        allstaff: paginationResponse.data,
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
  async findOne(id: string): Promise<Staff> {
    return await this.staffRepository.findOne(id);
  }

  /**
   * Gets staff
   * @param id 
   * @returns staff 
   */
  async getStaff(id: string): Promise<Staff> {
    const staff = await this.findOne(id);
    if (staff) {
      return staff
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Staff not found or disabled',
    });
  }

  /**
   * Finds oneby username
   * @param username 
   * @returns oneby username 
   */
  async findOnebyUsername(username: string): Promise<Staff> {
    return await this.staffRepository.findOne({ username });
  }

  /**
   * Removes staff
   * @param { id } 
   */
  async removeStaff({ id }: RemoveStaff) {
    try {
      const staff = await this.findOne(id)
      if (staff) {
        await this.staffRepository.delete(id)
        await this.usersService.remove(staff.user.id)
        return
      }
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Staff not found or disabled',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Disables staff
   * @param { id } 
   */
  async disableStaff({ id }: DisableStaff) {
    try {
      await this.usersService.deactivateUser(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds one by email
   * @param email 
   * @returns one by email 
   */
  async findOneByEmail(email: string): Promise<Staff> {
    return await this.staffRepository.findOne({ email: email });
  }
}
