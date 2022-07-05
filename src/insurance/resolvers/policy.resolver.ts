import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { CreatePolicyInput, PolicyPaginationInput, UpdatePolicyInput } from '../dto/policy-input.dto';
import { PoliciesPayload, PolicyPayload } from '../dto/policy-payload.dto';
import { Copay } from '../entities/copay.entity';
import { Insurance } from '../entities/insurance.entity';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { Policy } from '../entities/policy.entity';
import { CopayService } from '../services/copay.service';
import { InsuranceService } from '../services/insurance.service';
import { PolicyHolderService } from '../services/policy-holder.service';
import { PolicyService } from '../services/policy.service';

@Resolver(() => Policy)
export class PolicyResolver {
  constructor(
    private readonly policyService: PolicyService,
    private readonly policyHolderService: PolicyHolderService,
    private readonly patientService: PatientService,
    private readonly insuranceService: InsuranceService,
    private readonly copayService: CopayService,
    private readonly doctorService: DoctorService,
  ) { }

  @Query(() => PoliciesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchAllPolicies')
  async fetchAllPolicies(@Args('policyInput') policyInput: PolicyPaginationInput): Promise<PoliciesPayload> {
    const policies = await this.policyService.findAll(policyInput)
    return {
      ...policies,
      response: { status: 200, message: 'Policies data fetched successfully' }
    }
  }

  @Query(() => PolicyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchPolicy')
  async fetchPolicy(@Args('id') id: string): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.findById(id),
      response: { status: 200, message: "Policies matching id fetched successfully" }
    };
  }

  @Query(() => PoliciesPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'fetchPatientInsurances')
  async fetchPatientInsurances(@Args('id') id: string): Promise<PoliciesPayload> {
    return {
      policies: await this.policyService.fetchPatientInsurances(id),
      response: { status: 200, message: "Policies matching id fetched successfully" }
    };
  }

  @Mutation(() => PolicyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'createPolicy')
  async createPolicy(@Args('createPolicyInput') createPolicyInput: CreatePolicyInput): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.create(createPolicyInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Mutation(() => PolicyPayload)
  @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  @SetMetadata('name', 'updatePolicy')
  async updatePolicy(@Args('updatePolicyInput') updatePolicyInput: UpdatePolicyInput): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.update(updatePolicyInput),
      response: { status: 200, message: "Policy updated successfully" }
    };
  }

  @ResolveField(() => [PolicyHolder])
  async policyHolder(@Parent() policy: Policy): Promise<PolicyHolder> {
    return this.policyHolderService.findOne(policy.policyHolderId)
  }

  @ResolveField(() => [Patient])
  patient(@Parent() policy: Policy): Promise<Patient> {
    return this.patientService.findOne(policy.patientId)
  }

  @ResolveField(() => [Insurance])
  insurance(@Parent() policy: Policy): Promise<Insurance> {
    return this.insuranceService.findOne(policy.insuranceId)
  }

  @ResolveField(() => [Copay])
  copays(@Parent() policy: Policy): Promise<Copay[]> {
    if (policy) {
      return this.copayService.findByPolicyId(policy.id)
    }
  }

  @ResolveField(() => [Doctor])
  primaryCareProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy) {
      return this.doctorService.findOne(policy.primaryCareProviderId)
    }
  }

  @ResolveField(() => [Doctor])
  referringProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy) {
      return this.doctorService.findOne(policy.primaryCareProviderId)
    }
  }
}
