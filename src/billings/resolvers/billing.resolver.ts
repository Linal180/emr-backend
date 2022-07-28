import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
//entities
import { Code } from '../entities/code.entity';
import { Billing } from '../entities/billing.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { ClaimStatus } from '../entities/claim-status.entity';
import { Facility } from 'src/facilities/entities/facility.entity';
import { FeeSchedule } from 'src/feeSchedule/entities/feeSchedule.entity';
//services
import { BillingService } from '../services/billing.service';
import { ClaimStatusService } from '../services/claimStatus.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { FacilityService } from 'src/facilities/services/facility.service';
import { FeeScheduleService } from 'src/feeSchedule/services/feeSchedule.service';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import { BillingInput } from '../dto/billing-input.dto';
import SuperBillInput from '../dto/super-bill-input.dto';
import { GetClaimFileInput } from '../dto/claim-input.dto';
//payloads
import { BillingPayload } from '../dto/billing-payload';
import { SuperBillPayload } from '../dto/super-bill-payload';
import { ClaimFilePayload, ClaimNumberPayload } from '../dto/claim-payload';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(
    @InjectRepository(Code)
    private codeRepository: Repository<Code>,
    private readonly billingService: BillingService,
    private readonly facilityService: FacilityService,
    private readonly doctorService: DoctorService,
    private readonly claimStatusService: ClaimStatusService,
    private readonly feeScheduleService: FeeScheduleService,
  ) { }

  //mutations

  @Mutation(() => BillingPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createBilling')
  async createBilling(@Args('createBillingInput') createBillingInput: BillingInput): Promise<BillingPayload> {
    return {
      billing: await this.billingService.create(createBillingInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  //queries

  @Query(() => BillingPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchBillingDetailsByAppointmentId')
  async fetchBillingDetailsByAppointmentId(@Args('appointmentId') appointmentId: string) {
    return {
      billing: await this.billingService.fetchBillingDetailsByAppointmentId(appointmentId),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  // @Query(() => ClaimPayload)
  // async createClaim(@Args('claimInput') claimInput: ClaimInput): Promise<ClaimPayload> {
  //   return {
  //     claim: await this.billingService.createClaimInfo(claimInput),
  //     response: { status: 200, message: "Claim Created successfully" }
  //   };
  // }

  @Query(() => ClaimNumberPayload)
  async generateClaimNo(): Promise<ClaimNumberPayload> {
    return {
      claimNumber: await this.billingService.generateClaimNumber(),
      response: { status: 200, message: "Claim Created successfully" }
    };
  }

  @Query(() => ClaimFilePayload)
  async getClaimFile(@Args('getClaimFileInput') getClaimFileInput: GetClaimFileInput): Promise<ClaimFilePayload> {
    return {
      claimFile: await this.billingService.getClaimFile(getClaimFileInput),
      response: { status: 200, message: "Claim File created successfully" }
    };
  }

  @Query(() => SuperBillPayload)
  async getSuperBillInfo(@Args('superBillInput') superBillInput: SuperBillInput): Promise<SuperBillPayload> {
    return {
      ...(await this.billingService.getSuperBillInfo(superBillInput.appointmentId)),
      response: { status: 200, message: "Claim File created successfully" }
    };
  }

  //resolve fields

  @ResolveField(() => [Code])
  async codes(@Parent() billing: Billing): Promise<Code[]> {
    if (billing) {
      return await this.codeRepository.find({
        billingId: billing.id
      })
    }
  }

  @ResolveField(() => Facility)
  async facility(@Parent() billing: Billing): Promise<Facility> {
    if (billing.facilityId) {
      return await this.facilityService.findOne(billing.facilityId)
    }
  }

  @ResolveField(() => Doctor)
  async servicingProvider(@Parent() billing: Billing): Promise<Doctor> {
    if (billing.servicingProviderId) {
      return await this.doctorService.findOne(billing.servicingProviderId)
    }
  }

  @ResolveField(() => Doctor)
  async renderingProvider(@Parent() billing: Billing): Promise<Doctor> {
    if (billing.renderingProviderId) {
      return await this.doctorService.findOne(billing.renderingProviderId)
    }
  }

  @ResolveField(() => ClaimStatus)
  async claimStatus(@Parent() billing: Billing): Promise<ClaimStatus> {
    if (billing.claimStatusId) {
      return await this.claimStatusService.findOne(billing.claimStatusId)
    }
  }

  @ResolveField(() => FeeSchedule)
  async feeSchedule(@Parent() billing: Billing): Promise<FeeSchedule> {
    if (billing.feeScheduleId) {
      return await this.feeScheduleService.findOne({ id: billing.feeScheduleId })
    }
  }
}
