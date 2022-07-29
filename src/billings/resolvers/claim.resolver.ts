import { Args, Mutation, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
//inputs
import { CreateClaimInput, GetClaimInput } from "../dto/claim-input.dto";
//payload
import { ClaimPayload } from "../dto/claim-payload";
//service
import { ClaimService } from "../services/claim.service";
import { BillingService } from "../services/billing.service";
//entity
import { Claim } from "../entities/claim.entity";
import { Billing } from "../entities/billing.entity";


@Resolver(() => Claim)
export class ClaimResolver {
  constructor(
    private readonly claimService: ClaimService,
    private readonly billingService: BillingService
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

  @ResolveField(() => Billing)
  async billing(@Parent() claim: Claim): Promise<Billing> {
    if (claim?.billingId) {
      return await this.billingService.findOne(claim?.billingId)
    }
  }
}