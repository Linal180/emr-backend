import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import CreateLabTestObservationInput from '../dto/create-lab-test-observation-input.dto';
import { LabTestObservationPayload } from '../dto/labTestObservation-payload.dto';
import UpdateLabTestObservationInput, { RemoveLabTestObservation } from '../dto/update-lab-test-observationItem.input';
import { Observations } from '../entities/observations.entity';
import { LabTestsObservationsService } from '../services/labTestObservation.service';

@Resolver(() => Observations)
export class LabTestObservationResolver {
  constructor(private readonly labTestsObservationsService: LabTestsObservationsService) { }

  @Mutation(() => LabTestObservationPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createLabTestObservation')
  async createLabTestObservation(@Args('createLabTestObservationInput') createLabTestObservationInput: CreateLabTestObservationInput) {
    return {
      labTestObservation: await this.labTestsObservationsService.createLabTestObservation(createLabTestObservationInput),
      response: { status: 200, message: 'Lab test observations created successfully' }
    };
  }   

  @Mutation(() => LabTestObservationPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updateLabTestObservation')
  async updateLabTestObservation(@Args('updateLabTestObservationInput') updateLabTestObservationInput: UpdateLabTestObservationInput) {
    return {
      labTestObservation: await this.labTestsObservationsService.updateLabTestObservation(updateLabTestObservationInput),
      response: { status: 200, message: 'Lab test observations updated successfully' }
    };
  }

  @Mutation(() => LabTestObservationPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updateLabTestObservation')
  async syncLabResults() {
    return {
      labTestObservation: await this.labTestsObservationsService.syncLabResults(),
      response: { status: 200, message: 'Lab test observations synced successfully' }
    };
  }

  @Mutation(() => LabTestObservationPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'removeLabTestObservation')
  async removeLabTestObservation(@Args('removeLabTestObservation') removeLabTestObservation: RemoveLabTestObservation) {
    await this.labTestsObservationsService.removeLabTestObservation(removeLabTestObservation);
    return { response: { status: 200, message: 'Lab test observation Deleted' } };
  }
}
