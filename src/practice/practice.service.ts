import { ConflictException, forwardRef, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacilityService } from 'src/facilities/services/facility.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { StaffService } from 'src/providers/services/staff.service';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { UsersService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { CreatePracticeInput } from './dto/create-practice.input';
import PracticeInput from './dto/practice-input.dto';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticesPayload } from './dto/practices-payload.dto';
import { RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
import { Practice } from './entities/practice.entity';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Practice)
    private practiceRepository: Repository<Practice>,
    private readonly paginationService: PaginationService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    private readonly doctorService: DoctorService,
    private readonly staffService: StaffService
  ) { }

  /**
   * Creates practice
   * @param createPracticeInput 
   * @returns practice 
   */
  async createPractice(createPracticeInput: CreatePracticeInput): Promise<Practice> {
    try {
      //check if already user exists
      const user = await this.usersService.findOneByEmail(createPracticeInput.registerUserInput.email)
      if(user){
        throw new ConflictException({ 
          status: HttpStatus.CONFLICT,
          error: 'User associated with this email already exists',
        });
      }
      //creating practice
      const practiceInstance = this.practiceRepository.create(createPracticeInput.createPracticeItemInput)
      //create a facility 
      const facility  = await this.facilityService.addFacility(createPracticeInput)
      practiceInstance.facilities = [facility]
      //save the practice
      const practice = await this.practiceRepository.save(practiceInstance)
      const allRoles = await this.usersService.findAllRoles()
      const doctorRole = allRoles.find((item) => item.role === 'doctor')
      const adminRole = allRoles.find((item) => item.role === 'admin')
      //create a user or provider based on its role type under this facility
      if(createPracticeInput.registerUserInput.roleType === doctorRole.role){
          const registerUserInput : RegisterUserInput = {...createPracticeInput.registerUserInput}
          const doctor = await this.doctorService.addDoctor(registerUserInput, facility.id)
          if(createPracticeInput.registerUserInput.isAdmin){
             await this.usersService.updateRole({id: doctor.user.id, roles: [adminRole.role,registerUserInput.roleType]})
          }
      }else{
          const registerUserInput : RegisterUserInput = {...createPracticeInput.registerUserInput}
          const staff = await this.staffService.addStaff(registerUserInput, facility.id)
           if(createPracticeInput.registerUserInput.isAdmin){
            await this.usersService.updateRole({id: staff.user.id, roles: [adminRole.role, registerUserInput.roleType]})
          }
      }
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds all practices
   * @param practiceInput 
   * @returns all practices 
   */
  async findAllPractices(practiceInput: PracticeInput): Promise<PracticesPayload> {
    try {
      const paginationResponse = await this.paginationService.willPaginate<Practice>(this.practiceRepository, practiceInput)
      return {
        pagination: {
          ...paginationResponse
        },
        practices: paginationResponse.data,
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
  async findOne(id: string): Promise<Practice> {
    const practice = await this.practiceRepository.findOne(id);
    if(practice){
      return practice
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Practice not found',
    });
  }


  /**
   * Gets practice
   * @param id 
   * @returns practice 
   */
  async getPractice(id: string): Promise<PracticePayload> {
    const practice = await this.findOne(id);
    if (practice) {
      return { practice }
    }
  }

  /**
   * Updates practice
   * @param updatePracticeInput 
   * @returns practice 
   */
  async updatePractice(updatePracticeInput: UpdatePracticeInput): Promise<Practice> {
    try {
      const practice = await this.practiceRepository.save(updatePracticeInput)
      return practice
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Removes practice
   * @param { id } 
   */
  async removePractice({ id }: RemovePractice) {
    try {
      await this.practiceRepository.delete(id)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
