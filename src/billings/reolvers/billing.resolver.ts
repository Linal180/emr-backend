import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { Repository } from 'typeorm';
import BillingInput from '../dto/billing-input.dto';
import { BillingPayload } from '../dto/billing-payload';
import ClaimInput from '../dto/claim-input.dto';
import { ClaimFilePayload, ClaimPayload } from '../dto/claim-payload';
import { Billing } from '../entities/billing.entity';
import { Code } from '../entities/code.entity';
import { BillingService } from '../services/billing.service';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly billingService: BillingService,
  ) { }

  @Mutation(() => BillingPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createBilling')
  async createBilling(@Args('createBillingInput') createBillingInput: BillingInput): Promise<BillingPayload> {
    return {
      billing: await this.billingService.create(createBillingInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Query(() => BillingPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchBillingDetailsByAppointmentId')
  async fetchBillingDetailsByAppointmentId(@Args('appointmentId') appointmentId: string) {
    return {
      billing: await this.billingService.fetchBillingDetailsByAppointmentId(appointmentId),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Query(() => ClaimPayload)
  async createClaim(@Args('claimInput') claimInput: ClaimInput): Promise<ClaimPayload> {
    return {
      claim: await this.billingService.createClaimInfo(claimInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Query(() => ClaimFilePayload)
  async getClaimFile(@Args('claimInput') claimInput: ClaimInput): Promise<ClaimFilePayload> {
    return {
      claimFile: await this.billingService.getClaimFile(claimInput),
      response: { status: 200, message: "Claim File created successfully" }
    };
  }

  @ResolveField(() => [Code])
  async codes(@Parent() billing: Billing): Promise<Code[]> {
    if (billing) {
      return await this.codeRepository.find({
        billingId: billing.id
      })
    }
  }
}
