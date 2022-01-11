import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
import { CreateStaffInput } from '../dto/create-staff.input';
import StaffInput from '../dto/staff-input.dto';
import { DisableStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';
import { Staff } from '../entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly utilsService: UtilsService,
  ) { }

  /**
   * Creates staff
   * @param createStaffInput 
   * @returns staff 
   */
  async createStaff(createStaffInput: CreateStaffInput): Promise<Staff> {
    try {
      // register staff as user 
      const user = await this.usersService.create(createStaffInput)
      //get facility 
      const facility = await this.facilityService.findOne(createStaffInput.facilityId)
      if (user && facility) {
        // Staff Creation
        const staff = this.staffRepository.create(createStaffInput)
        staff.user = user;
        staff.facility = facility;
        staff.facilityId = facility.id
        return await this.staffRepository.save(staff);
      }
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Could not create staff',
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Updates staff
   * @param UpdateStaffInput 
   * @returns staff 
   */
  async updateStaff(updateStaffInput: UpdateStaffInput): Promise<Staff> {
    try {
      return await this.utilsService.updateEntityManager(Staff, updateStaffInput.id, updateStaffInput, this.staffRepository)
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
      const paginationResponse = await this.paginationService.willPaginate<Staff>(this.staffRepository, staffInput)
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
      await this.staffRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

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
