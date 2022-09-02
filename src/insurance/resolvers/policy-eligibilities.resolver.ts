import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
import PermissionGuard from 'src/users/auth/role.guard';
import { PolicyEligibilityPaginationInput } from '../dto/policy-eligibility-input';
import { PolicyEligibilitiesPayload, PolicyEligibilityPayload, PolicyEligibilityWithPatientPayload } from '../dto/policy-eligibility.dto';
import { CreatePolicyInput, PolicyPaginationInput, UpdatePolicyInput } from '../dto/policy-input.dto';
import { PoliciesPayload, PolicyPayload } from '../dto/policy-payload.dto';
import { Copay } from '../entities/copay.entity';
import { Insurance } from '../entities/insurance.entity';
import { PolicyCoverage } from '../entities/policy-coverage.entity';
import { PolicyEligibility } from '../entities/policy-eligibility.entity';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { Policy } from '../entities/policy.entity';
import { CopayService } from '../services/copay.service';
import { InsuranceService } from '../services/insurance.service';
import { PolicyHolderService } from '../services/policy-holder.service';
import { PolicyService } from '../services/policy.service';

@Resolver(() => PolicyEligibility)
export class PolicyEligibilityResolver {
  constructor(
    private readonly policyService: PolicyService,
  ) { }

  @Mutation(() => PolicyEligibilityPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'updatePolicy')
  async getEligibilityAndCoverage(@Args('policyId') policyId: string): Promise<PolicyEligibilityPayload> {
    return {
      policyEligibility: await this.policyService.getEligibilityAndCoverage(policyId),
      response: { status: 200, message: "Policy coverage and eligibility fetched successfully" }
    };
  }

  @Query(() => PolicyEligibilitiesPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchPatientInsurances')
  async getPoliciesEligibilities(@Args('policyEligibilityInput') policyEligibilityInput: PolicyEligibilityPaginationInput): Promise<PolicyEligibilitiesPayload> {
    const policyEligibilities = await this.policyService.getPolicyEligibilities(policyEligibilityInput)
    return {
      ...policyEligibilities,
      response: { status: 200, message: "Policy Eligibilities fetched successfully" }
    };
  }

  @Query(() => PolicyEligibilityWithPatientPayload)
  // @UseGuards(JwtAuthGraphQLGuard, PermissionGuard)
  // @SetMetadata('name', 'fetchPatientInsurances')
  async getPoliciesEligibility(@Args('id') id: string): Promise<PolicyEligibilityWithPatientPayload> {
    const policyEligibility = await this.policyService.getPolicyEligibility(id)
    return {
      ...policyEligibility,
      response: { status: 200, message: "Policy Eligibilities fetched successfully" }
    };
  }

  @ResolveField(() => Policy)
  policy(@Parent() policyEligibility: PolicyEligibility): Promise<Policy> {
    if (policyEligibility) {
      return this.policyService.findOne(policyEligibility.policyId)
    }
  }

  @ResolveField(() => [PolicyCoverage])
  policyCoverages(@Parent() policyEligibility: PolicyEligibility): Promise<PolicyCoverage[]> {
    if (policyEligibility) {
      return this.policyService.getPolicyCoverages(policyEligibility.id)
    }
  }
}


