import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { AllDoctorPayload } from '../dto/all-doctor-payload.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import DoctorInput from '../dto/doctor-input.dto';
import { DoctorPayload } from '../dto/doctor-payload.dto';
import { UpdateDoctorInput } from '../dto/update-doctor.input';
import { DisableDoctor, GetDoctor, RemoveDoctor } from '../dto/update-doctorItem.input';
import { Doctor } from '../entities/doctor.entity';
import { DoctorService } from '../services/doctor.service';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService,
    private readonly attachmentsService: AttachmentsService) { }

  @Mutation(() => DoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createDoctor')
  async createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
    return {
      doctor: await this.doctorService.createDoctor(createDoctorInput),
      response: { status: 200, message: 'Doctor created successfully' }
    };
  }

  @Mutation(() => DoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateDoctor')
  async updateDoctor(@Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput) {
    return {
      doctor: await this.doctorService.updateDoctor(updateDoctorInput),
      response: { status: 200, message: 'Doctor updated successfully' }
    };
  }

  @Query(returns => AllDoctorPayload)
  async findAllDoctor(@Args('doctorInput') doctorInput: DoctorInput): Promise<AllDoctorPayload> {
    const doctors = await this.doctorService.findAllDoctor(doctorInput)
    if (doctors) {
      return {
        ...doctors,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'doctors not found',
    });
  }

  @Query(returns => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getDoctor')
  async getDoctor(@Args('getDoctor') getDoctor: GetDoctor): Promise<DoctorPayload> {
    return {
      doctor: await this.doctorService.getDoctor(getDoctor.id),
      response: { status: 200, message: 'Doctor fetched successfully' }
    };
  }

  @Mutation(() => DoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeDoctor')
  async removeDoctor(@Args('removeDoctor') removeDoctor: RemoveDoctor) {
    await this.doctorService.removeDoctor(removeDoctor);
    return { response: { status: 200, message: 'Doctor Deleted' } };
  }

  @Mutation(() => DoctorPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'disableDoctor')
  async disableDoctor(@Args('disableDoctor') disableDoctor: DisableDoctor) {
    await this.doctorService.disableDoctor(disableDoctor);
    return { response: { status: 200, message: 'Doctor Disabled' } };
  }

  @ResolveField((returns) => [Attachment])
  async attachments(@Parent() doctor: Doctor): Promise<Attachment[]> {
    if (doctor) {
      return await this.attachmentsService.findAttachments(doctor.id, AttachmentType.DOCTOR);
    }
  }
}
