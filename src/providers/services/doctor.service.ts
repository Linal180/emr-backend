import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { UsersService } from 'src/users/users.service';
import { UtilsService } from 'src/util/utils.service';
import { Repository } from 'typeorm';
import { AllStaffPayload } from '../dto/all-staff-payload.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import { CreateStaffInput } from '../dto/create-staff.input';
import StaffInput from '../dto/staff-input.dto';
import { DisableStaff, RemoveStaff, UpdateStaffInput } from '../dto/update-facility.input';
import { Doctor } from '../entities/doctor.entity';
import { Staff } from '../entities/staff.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
    private readonly facilityService: FacilityService,
    private readonly utilsService: UtilsService,
  ) { }

  async createDoctor(createDoctorInput: CreateDoctorInput): Promise<Doctor> {
    try {
      // register doctor as user 
      const user = await this.usersService.create(createDoctorInput.createDoctorItemInput)
      //get facility 
      const facility = await this.facilityService.findOne(createDoctorInput.createDoctorItemInput.facilityId)
      if (user && facility) {
        // Staff Creation
        const doctor = this.doctorRepository.create(createDoctorInput.createDoctorItemInput)
        doctor.user = user;
        doctor.facility = facility;
        return await this.doctorRepository.save(doctor);
      }
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Could not create doctor',
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
  // async updateStaff(updateStaffInput: UpdateStaffInput): Promise<Staff> {
  //   try {
  //     return await this.utilsService.updateEntityManager(Staff, updateStaffInput.id, updateStaffInput, this.staffRepository)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  /**
   * Finds all staff
   * @param staffInput 
   * @returns all staff 
   */
  // async findAllStaff(staffInput: StaffInput): Promise<AllStaffPayload> {
  //   try {
  //     const paginationResponse = await this.paginationService.willPaginate<Staff>(this.staffRepository, staffInput)
  //     return {
  //       pagination: {
  //         ...paginationResponse
  //       },
  //       allstaff: paginationResponse.data,
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  // async findOne(id: string): Promise<Staff> {
  //   return await this.staffRepository.findOne(id);
  // }


  // /**
  //  * Finds oneby username
  //  * @param username 
  //  * @returns oneby username 
  //  */
  // async findOnebyUsername(username: string): Promise<Staff> {
  //   return await this.staffRepository.findOne({ username });
  // }

  // /**
  //  * Removes staff
  //  * @param { id } 
  //  */
  // async removeStaff({ id }: RemoveStaff) {
  //   try {
  //     await this.staffRepository.delete(id)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // async disableStaff({ id }: DisableStaff) {
  //   try {
  //     await this.usersService.deactivateUser(id)
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }

  // /**
  //  * Finds one by email
  //  * @param email 
  //  * @returns one by email 
  //  */
  // async findOneByEmail(email: string): Promise<Staff> {
  //   return await this.staffRepository.findOne({ email: email });
  // }
}
