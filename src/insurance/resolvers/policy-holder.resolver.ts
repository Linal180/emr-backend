import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PolicyHolderInput, PolicyHolderPaginationInput } from '../dto/policy-holder-input';
import { PolicyHoldersPayload } from '../dto/policy-holder.payload';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { PolicyHolderService } from '../services/policy-holder.service';

@Resolver(() => PolicyHolder)
export class PolicyHolderResolver {
  constructor(private readonly policyHolderService: PolicyHolderService,
  ) { }

  @Query(() => PolicyHoldersPayload)
  fetchAllPolicyHolders(@Args('policyHolderPaginationInput') policyHolderPaginationInput: PolicyHolderPaginationInput): Promise<PolicyHoldersPayload> {
    return this.policyHolderService.findAll(policyHolderPaginationInput)
  }

  @Query(() => PolicyHolder)
  fetchPolicyHolder(@Args('id') id: string): Promise<PolicyHolder> {
    return this.policyHolderService.findOne(id)
  }

  @Mutation(() => PolicyHolder)
  createPolicyHolder(@Args('createPolicyHolderInput') createPolicyHolderInput: PolicyHolderInput): Promise<PolicyHolder> {
    return this.policyHolderService.create(createPolicyHolderInput)
  }
}
