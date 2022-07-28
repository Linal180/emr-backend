import { Args, Mutation, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
//inputs
import { CreateClaimInput, GetClaimInput } from "../dto/claim-input.dto";
//payload
import { ClaimPayload } from "../dto/claim-payload";
//service
import { ClaimService } from "../services/claim.service";
import { ClaimStatusService } from "../services/claimStatus.service";
//entity
import { Claim } from "../entities/claim.entity";
import { ClaimStatus } from "../entities/claim-status.entity";


@Resolver(() => Claim)
export class ClaimResolver {
  constructor(
    private readonly claimService: ClaimService,
    private readonly claimStatusService: ClaimStatusService,
  ) { }

  //mutations

  @Mutation(() => ClaimPayload)
  //  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  //  @SetMetadata('name', 'createClaim')
  async createClaim(@Args('createClaimInput') createClaimInput: CreateClaimInput): Promise<ClaimPayload> {
    return {
      claim: await this.claimService.createClaim(createClaimInput),
      response: { status: 200, message: "Claim created successfully" }
    };
  }

  //queries

  @Query(() => ClaimPayload)
  //  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  //  @SetMetadata('name', 'getClaim')
  async getClaim(@Args('getClaimInput') getClaimInput: GetClaimInput): Promise<ClaimPayload> {
    return {
      claim: await this.claimService.getClaim(getClaimInput),
      response: { status: 200, message: "Claim get successfully" }
    };
  }

  //resolve fields

  @ResolveField(() => ClaimStatus)
  async claimStatus(@Parent() claim: Claim): Promise<ClaimStatus> {
    if (claim?.claimStatusId) {
      return await this.claimStatusService.findOne(claim?.claimStatusId)
    }
  }
}