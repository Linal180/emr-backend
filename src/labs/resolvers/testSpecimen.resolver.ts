import { HttpStatus, NotFoundException, SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { TestSpecimenTypeInput } from '../dto/testSpecimenType-input.dto';
import { TestSpecimenTypesPayload } from '../dto/testSpecimenTypes-payload.dto copy';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { SpecimenTypes } from '../entities/specimenTypes.entity';
import { TestSpecimens } from '../entities/testSpecimens.entity';
import { TestSpecimenService } from '../services/testSpecimen.service';

@Resolver(() => TestSpecimens)
export class TestSpecimenResolver {
  constructor(private readonly testSpecimenService: TestSpecimenService) { }
  @Query(returns => TestSpecimenTypesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'findAllTestSpecimen')
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

  @ResolveField((returns) => SpecimenTypes)
  async specimenTypes(@Parent() testSpecimens: TestSpecimens): Promise<SpecimenTypes> {
    if (testSpecimens && testSpecimens.specimenTypesId) {
     return await this.testSpecimenService.findSpecimenTypeById(testSpecimens.specimenTypesId);
    }
  }
}
