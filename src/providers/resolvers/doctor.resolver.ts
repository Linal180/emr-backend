import { ConflictException, HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { AllDoctorPayload } from '../dto/all-doctor-payload.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import DoctorInput from '../dto/doctor-input.dto';
import { DoctorPayload } from '../dto/doctor-payload.dto';
import { DisableDoctor, GetDoctor, RemoveDoctor, UpdateDoctorInput } from '../dto/update-doctor.input';
import { DoctorService } from '../services/doctor.service';

@Resolver('doctor')
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) { }

  @Mutation(() => DoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin', 'admin'])
  async createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
    return {
      staff: await this.doctorService.createDoctor(createDoctorInput),
      response: { status: 200, message: 'Doctor created successfully' }
    };
  }

  // @Mutation(() => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard)
  // @SetMetadata('roles', ['admin', 'super-admin'])
  // async updateDoctor(@Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput) {
  //   return {
  //     staff: await this.staffService.updateStaff(updateDoctorInput),
  //     response: { status: 200, message: 'Doctor updated successfully' }
  //   };
  // }

  // @Query(returns => AllDoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])
  // async findAllDoctor(@Args('doctorInput') doctorInput: DoctorInput): Promise<AllDoctorPayload> {
  //   const doctors = await this.staffService.findAllStaff(doctorInput)
  //   if (doctors) {
  //     return {
  //       ...doctors,
  //       response: {
  //         message: "OK", status: 200,
  //       }
  //     }
  //   }
  //   throw new NotFoundException({
  //     status: HttpStatus.NOT_FOUND,
  //     error: 'doctors not found',
  //   });
  // }

  // @Query(returns => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['admin', 'super-admin', 'admin'])
  // async getDoctor(@Args('getDoctor') getDoctor: GetDoctor): Promise<DoctorPayload> {
  //   return {
  //     doctor: await this.staffService.findOne(getDoctor.id),
  //     response: { status: 200, message: 'Doctor fetched successfully' }
  //   };
  // }

  // @Mutation(() => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])
  // async removeDoctor(@Args('removeDoctor') removeDoctor: RemoveDoctor) {
  //   await this.staffService.removeStaff(removeDoctor);
  //   return { response: { status: 200, message: 'Doctor Deleted' } };
  // }

  // @Mutation(() => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  // @SetMetadata('roles', ['super-admin', 'admin'])
  // async disableDoctor(@Args('disableDoctor') disableDoctor: DisableDoctor) {
  //   await this.staffService.disableStaff(disableDoctor);
  //   return { response: { status: 200, message: 'Doctor Disabled' } };
  // }
}
