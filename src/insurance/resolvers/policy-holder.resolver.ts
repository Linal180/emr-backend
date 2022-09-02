import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { PolicyHolderInput, PolicyHolderPaginationInput } from '../dto/policy-holder-input';
import { PolicyHoldersPayload } from '../dto/policy-holder.payload';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { PolicyHolderService } from '../services/policy-holder.service';

@Resolver(() => PolicyHolder)
export class PolicyHolderResolver {
  constructor(private readonly policyHolderService: PolicyHolderService,
  ) { }

  @Query(() => PolicyHoldersPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllPolicyHolders')
  fetchAllPolicyHolders(@Args('policyHolderPaginationInput') policyHolderPaginationInput: PolicyHolderPaginationInput): Promise<PolicyHoldersPayload> {
    return this.policyHolderService.findAll(policyHolderPaginationInput)
  }

  @Query(() => PolicyHolder)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchPolicyHolder')
  fetchPolicyHolder(@Args('id') id: string): Promise<PolicyHolder> {
    return this.policyHolderService.findOne(id)
  }

  @Mutation(() => PolicyHolder)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createPolicyHolder')
  createPolicyHolder(@Args('createPolicyHolderInput') createPolicyHolderInput: PolicyHolderInput): Promise<PolicyHolder> {
    return this.policyHolderService.create(createPolicyHolderInput)
  }
}
