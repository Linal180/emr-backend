import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BillingInput from '../dto/billing-input.dto';
import { BillingPayload } from '../dto/billing-payload';
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
  async createBilling(@Args('createBillingInput') createBillingInput: BillingInput): Promise<BillingPayload> {
    return {
      billing: await this.billingService.create(createBillingInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Query(() => BillingPayload)
  async fetchBillingDetailsByAppointmentId(@Args('appointmentId') appointmentId: string) {
    return {
      billing: await this.billingService.fetchBillingDetailsByAppointmentId(appointmentId),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @ResolveField((returns) => [Code])
  async codes(@Parent() billing: Billing): Promise<Code[]> {
    if (billing) {
      return await this.codeRepository.find({
        billingId: billing.id
      })
    }
  }
}
