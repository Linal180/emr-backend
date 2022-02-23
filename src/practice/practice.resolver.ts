import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import RoleGuard from 'src/users/auth/role.guard';
import { CreatePracticeInput } from './dto/create-practice.input';
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
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['super-admin'])
  async createPractice(@Args('createPracticeInput') createPracticeInput: CreatePracticeInput) {
    return {
      practice: await this.practiceService.createPractice(createPracticeInput),
      response: { status: 200, message: 'Practice created successfully' }
    };
  }

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async updatePractice(@Args('updatePracticeInput') updatePracticeInput: UpdatePracticeInput) {
    return {
      practice: await this.practiceService.updatePractice(updatePracticeInput),
      response: { status: 200, message: 'Practice updated successfully' }
    };
  }


  @Query(returns => PracticesPayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin'])
  async findAllPractices(@Args('facilityInput') facilityInput: FacilityInput): Promise<PracticesPayload> {
    const practices = await this.practiceService.findAllPractices(facilityInput)
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
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['admin', 'super-admin'])
  async getPractice(@Args('getPractice') getPractice: GetPractice): Promise<PracticePayload> {
    const practice = await this.practiceService.getPractice(getPractice.id)
    return {
      ...practice,
      response: { status: 200, message: 'Practice fetched successfully' }
    };
  }

  @Mutation(() => PracticePayload)
  @UseGuards(JwtAuthGraphQLGuard, RoleGuard)
  @SetMetadata('roles', ['super-admin'])
  async removePractice(@Args('removePractice') removePractice: RemovePractice) {
    await this.practiceService.removePractice(removePractice);
    return { response: { status: 200, message: 'Practice Deleted' } };
  }
}
