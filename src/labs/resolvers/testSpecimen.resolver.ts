import { Args, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import { TestSpecimenTypeInput } from '../dto/testSpecimenType-input.dto';
import { TestSpecimenTypesPayload } from '../dto/testSpecimenTypes-payload.dto';
//entities
import { SpecimenTypes } from '../entities/specimenTypes.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';
//services
import { TestSpecimenService } from '../services/testSpecimen.service';

@Resolver(() => TestSpecimens)
export class TestSpecimenResolver {
  constructor(
    private readonly testSpecimenService: TestSpecimenService
  ) { }

  // queries

  @Query(() => TestSpecimenTypesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'findAllTestSpecimenTypes')
  async findAllTestSpecimenTypes(@Args('testSpecimenTypeInput') testSpecimenTypeInput: TestSpecimenTypeInput): Promise<TestSpecimenTypesPayload> {
    const testSpecimenTypes = await this.testSpecimenService.findAllTestSpecimenTypes(testSpecimenTypeInput)
    if (testSpecimenTypes) {
      return {
        ...testSpecimenTypes,
        response: {
          message: "OK", status: 200,
        }
      }
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Lab Test not found',
    });
  }

  @Query(() => SpecimenTypes)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'getSpecimenTypeByName')
  async getSpecimenTypeByName(@Args('name') name: string): Promise<SpecimenTypes> {
    const testSpecimenTypes = await this.testSpecimenService.GetSpecimenByName(name)
    if (testSpecimenTypes) {
      return testSpecimenTypes
    }
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Specimen Type not found',
    });
  }

  // resolve fields

  @ResolveField(() => SpecimenTypes)
  async specimenTypes(@Parent() testSpecimens: TestSpecimens): Promise<SpecimenTypes> {
    if (testSpecimens && testSpecimens.specimenTypesId) {
      return await this.testSpecimenService.findSpecimenTypeById(testSpecimens.specimenTypesId);
    }
  }
}
