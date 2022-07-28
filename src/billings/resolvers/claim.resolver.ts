import { Args, Mutation, Resolver } from "@nestjs/graphql";
//inputs
import { CreateClaimInput } from "../dto/claim-input.dto";
//payload
import { ClaimPayload } from "../dto/claim-payload";
//service
import { ClaimService } from "../services/claim.service";
//entity
import { Claim } from "../entities/claim.entity";


@Resolver(() => Claim)
export class BillingResolver {
  constructor(
    private readonly claimService: ClaimService) { }


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

}