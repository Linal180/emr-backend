import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import { default as PermissionGuard } from 'src/users/auth/role.guard';
import { CreatePracticeInput } from './dto/create-practice.input';
import PracticeInput from './dto/practice-input.dto';
import FacilityInput from './dto/practice-input.dto';
import { PracticePayload } from './dto/practice-payload.dto';
import { PracticesPayload } from './dto/practices-payload.dto';
import { GetPractice, RemovePractice, UpdatePracticeInput } from './dto/update-practice.input';
import { Practice } from './entities/practice.entity';
import { PracticeService } from './practice.service';

@Resolver(() => Practice)
export class PracticeResolver {
  constructor(private readonly practiceService: PracticeService) { }

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


  @Query(returns => PracticesPayload)
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

  @Query(returns => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getPractice')
  async getPractice(@Args('getPractice') getPractice: GetPractice): Promise<PracticePayload> {
    const practice = await this.practiceService.getPractice(getPractice.id)
    return {
      ...practice,
      response: { status: 200, message: 'Practice fetched successfully' }
    };
  }

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removePractice')
  async removePractice(@Args('removePractice') removePractice: RemovePractice) {
    await this.practiceService.removePractice(removePractice);
    return { response: { status: 200, message: 'Practice Deleted' } };
  }
}
