import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { Doctor } from '../entities/doctor.entity';
import { Taxonomy } from 'src/facilities/entities/taxonomy.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//services
import { DoctorService } from '../services/doctor.service';
import { TaxonomiesService } from 'src/facilities/services/taxonomy.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
//guards
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
//payloads
import { DoctorPayload } from '../dto/doctor-payload.dto';
import { AllDoctorPayload } from '../dto/all-doctor-payload.dto';
//inputs
import DoctorInput from '../dto/doctor-input.dto';
import { CreateDoctorInput } from '../dto/create-doctor.input';
import { UpdateDoctorInput } from '../dto/update-doctor.input';
import { DisableDoctor, GetDoctor, RemoveDoctor } from '../dto/update-doctorItem.input';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService,
    private readonly attachmentsService: AttachmentsService,
    private readonly taxonomiesService: TaxonomiesService
  ) { }

  //mutations

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

  //queries

  @Query(() => AllDoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllDoctor')
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

  @Query(() => DoctorPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getDoctor')
  async getDoctor(@Args('getDoctor') getDoctor: GetDoctor): Promise<DoctorPayload> {
    return {
      doctor: await this.doctorService.getDoctor(getDoctor.id),
      response: { status: 200, message: 'Doctor fetched successfully' }
    };
  }

  //resolve fields

  @ResolveField(() => [Attachment])
  async attachments(@Parent() doctor: Doctor): Promise<Attachment[]> {
    if (doctor) {
      return await this.attachmentsService.findAttachments(doctor.id, AttachmentType.DOCTOR);
    }
  }

  @ResolveField(() => [Taxonomy])
  async taxCode(@Parent() doctor: Doctor): Promise<Taxonomy> {
    if (doctor.taxonomyCode) {
      return await this.taxonomiesService.findOne(doctor.taxonomyCode);
    }
  }
}
