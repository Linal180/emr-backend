import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
//entities
import { Practice } from './entities/practice.entity';
import { FeeSchedule } from 'src/feeSchedule/entities/feeSchedule.entity';
import { Attachment, AttachmentType } from 'src/attachments/entities/attachment.entity';
//services
import { PracticeService } from './practice.service';
import { AttachmentsService } from 'src/attachments/services/attachments.service';
//guards
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import { CreatePracticeInput } from './dto/create-practice.input';
import { GetPractice, RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
//payloads
import PracticeInput from './dto/practice-input.dto';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticesPayload } from './dto/practices-payload.dto';
import { FeeScheduleService } from 'src/feeSchedule/services/feeSchedule.service';

@Resolver(() => Practice)
export class PracticeResolver {
  constructor(
    private readonly practiceService: PracticeService,
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
    return { response: { status: 200, message: 'Practice Deleted' } };
  }

  //resolve fields

  @ResolveField(() => [Attachment])
  async attachments(@Parent() practice: Practice): Promise<Attachment[]> {
    if (practice) {
      return await this.attachmentsService.findAttachments(practice.id, AttachmentType.PRACTICE);
    }
  }

  @ResolveField(() => [Attachment])
  async feeSchedules(@Parent() practice: Practice): Promise<FeeSchedule[]> {
    if (practice) {
      return await this.feeScheduleService.getFeeScheduleByPracticeId(practice.id);
    }
  }
}
