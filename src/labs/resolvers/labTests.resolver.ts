import { Args, Mutation, Resolver } from '@nestjs/graphql';
import CreateLabTestInput from '../dto/create-lab-test-input.dto';
import { LabTestPayload } from '../dto/labTest-payload.dto';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { LabTests } from '../entities/labTests.entity';
import { LabTestsService } from '../services/labTests.service';

@Resolver(() => LabTests)
export class LabTestsResolver {
  constructor(private readonly labTestsService: LabTestsService) { }

  @Mutation(() => LabTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createLabTest')
  async createLabTest(@Args('createLabTestInput') createLabTestInput: CreateLabTestInput) {
    return {
      labTest: await this.labTestsService.createLabTest(createLabTestInput),
      response: { status: 200, message: 'Lab test created successfully' }
    };
  } 

  @Mutation(() => LabTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateLabTest')
  async updateLabTest(@Args('updateLoincCodeInput') updateLoincCodeInput: UpdateLoincCodeInput) {
    return {
      labTest: await this.labTestsService.updateLabTest(updateLoincCodeInput),
      response: { status: 200, message: 'Lab test updated successfully' }
    };
  }
}
