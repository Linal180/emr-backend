import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { Practice } from './entities/practice.entity';
import { Taxonomy } from 'src/facilities/entities/taxonomy.entity';
import { FeeSchedule } from 'src/feeSchedule/entities/feeSchedule.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//services
import { PracticeService } from './practice.service';
import { TaxonomiesService } from 'src/facilities/services/taxonomy.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
import { FeeScheduleService } from 'src/feeSchedule/services/feeSchedule.service';
//guards
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import PracticeInput from './dto/practice-input.dto';
import { CreatePracticeInput } from './dto/create-practice.input';
import { GetPractice, RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
//payloads
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticeCountPayload, PracticesPayload } from './dto/practices-payload.dto';

@Resolver(() => Practice)
export class PracticeResolver {
  constructor(
    private readonly practiceService: PracticeService,
    private readonly taxonomiesService: TaxonomiesService,
    private readonly attachmentsService: AttachmentsService,
    private readonly feeScheduleService: FeeScheduleService,
  ) { }

  //queries

  @Query(() => PracticesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllPractices')
  async findAllPractices(@Args('practiceInput') practiceInput: PracticeInput): Promise<PracticesPayload> {
    const practices = await this.practiceService.findAllPractices(practiceInput)
    if (practices) {
      return {
        ...practices,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Practices not found',
    });
  }

  @Query(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPractice')
  async getPractice(@Args('getPractice') getPractice: GetPractice): Promise<PracticePayload> {
    const practice = await this.practiceService.getPractice(getPractice.id)
    return {
      ...practice,
      response: { status: 200, message: 'Practice fetched successfully' }
    };
  }

  @Query(() => PracticeCountPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'getAllPractices')
  async getAllPractices(): Promise<PracticeCountPayload> {
    const practices = await this.practiceService.allPracticeCount()
    return {
      practices,
      response: {
        message: "OK", status: 200,
      }
    }
  }

  //mutations

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createPractice')
  async createPractice(@Args('createPracticeInput') createPracticeInput: CreatePracticeInput) {
    return {
      practice: await this.practiceService.createPractice(createPracticeInput),
      response: { status: 200, message: 'Practice created successfully' }
    };
  }

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePractice')
  async updatePractice(@Args('updatePracticeInput') updatePracticeInput: UpdatePracticeInput) {
    return {
      practice: await this.practiceService.updatePractice(updatePracticeInput),
      response: { status: 200, message: 'Practice updated successfully' }
    };
  }

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePractice')
  async removePractice(@Args('removePractice') removePractice: RemovePractice) {
    await this.practiceService.removePractice(removePractice);
    return { response: { status: 200, message: 'Practice updated successfully' } };
  }

  //resolve fields

  @ResolveField(() => [Attachment])
  async attachments(@Parent() practice: Practice): Promise<Attachment[]> {
    if (practice) {
      return await this.attachmentsService.findAttachments(practice.id, AttachmentType.PRACTICE);
    }
  }

  @ResolveField(() => [FeeSchedule])
  async feeSchedules(@Parent() practice: Practice): Promise<FeeSchedule[]> {
    if (practice) {
      return await this.feeScheduleService.getFeeScheduleByPracticeId(practice.id);
    }
  }

  @ResolveField(() => Taxonomy)
  async taxonomyCode(@Parent() practice: Practice): Promise<Taxonomy> {
    if (practice.taxonomyCodeId) {
      return await this.taxonomiesService.findOne(practice.taxonomyCodeId);
    }
  }
}
