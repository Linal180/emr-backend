import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { default as LoincCodeInput } from '../dto/create-loincCode-input.dto';
import { LabTestPayload } from '../dto/labTests-payload.dto';
import { UpdateLoincCodeInput } from '../dto/update-loincCode.input';
import { LabTests } from '../entities/labTests.entity';
import { LoincCodesService } from '../services/loincCodes.service';

@Resolver(() => LabTests)
export class LabTestsResolver {
  constructor(private readonly loincCodesService: LoincCodesService) { }

  @Mutation(() => LabTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createLabTest')
  async createLabTest(@Args('loincCodeInput') loincCodeInput: LoincCodeInput) {
    return {
      loincCode: await this.loincCodesService.createLoincCode(loincCodeInput),
      response: { status: 200, message: 'Lab test created successfully' }
    };
  }

  @Mutation(() => LabTestPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateLabTest')
  async updateLabTest(@Args('updateLoincCodeInput') updateLoincCodeInput: UpdateLoincCodeInput) {
    return {
      loincCode: await this.loincCodesService.updateLoincCode(updateLoincCodeInput),
      response: { status: 200, message: 'Lab test updated successfully' }
    };
  }
}
