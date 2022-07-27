import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
//inputs
import { ClaimStatusInput, ClaimStatusPaginationInput, UpdateClaimStatusInput } from '../dto/claim-status-input.dto';
//payload
import { ClaimStatusesPayload, ClaimStatusPayload } from '../dto/claimStatus-payload';
//entity
import { ClaimStatus } from '../entities/claim-status.entity';
//service
import { ClaimStatusService } from '../services/claimStatus.service';

@Resolver(() => ClaimStatus)
export class ClaimStatusResolver {
  constructor(
    private readonly claimStatusService: ClaimStatusService,
  ) { }

  @Mutation(() => ClaimStatusPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createBilling')
  async createClaimStatus(@Args('createClaimStatusInput') createClaimStatusInput: ClaimStatusInput): Promise<ClaimStatusPayload> {
    return {
      claimStatus: await this.claimStatusService.create(createClaimStatusInput),
      response: { status: 200, message: "Claim Status created successfully" }
    };
  }

  @Mutation(() => ClaimStatusPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createBilling')
  async updateClaimStatus(@Args('updateClaimStatusInput') updateClaimStatusInput: UpdateClaimStatusInput): Promise<ClaimStatusPayload> {
    return {
      claimStatus: await this.claimStatusService.update(updateClaimStatusInput),
      response: { status: 200, message: "Claim Status updated successfully" }
    };
  }

  @Mutation(() => ClaimStatusPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'createBilling')
  async removeClaimStatus(@Args('id') id: string): Promise<ClaimStatusPayload> {
    return {
      claimStatus: await this.claimStatusService.remove(id),
      response: { status: 200, message: "Claim Status deleted successfully" }
    };
  }

  @Query(() => ClaimStatusesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchBillingDetailsByAppointmentId')
  async fetchAllClaimStatuses(@Args('claimStatusPaginationInput') claimStatusPaginationInput: ClaimStatusPaginationInput): Promise<ClaimStatusesPayload> {
    const claimStatuses = await this.claimStatusService.fetchAllClaimStatuses(claimStatusPaginationInput)
    return {
      ...claimStatuses,
      response: { status: 200, message: "Claim Statuses Fetched Successfully" }
    };
  }

  @Query(() => ClaimStatusPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchBillingDetailsByAppointmentId')
  async findClaimStatus(@Args('id') id: String): Promise<ClaimStatusPayload> {
    const claimStatus = await this.claimStatusService.findOne(id)
    return {
      claimStatus: claimStatus,
      response: { status: 200, message: "Claim Status Fetched Successfully" }
    };
  }
}
