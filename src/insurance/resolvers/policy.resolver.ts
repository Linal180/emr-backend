import { SetMetadata, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
//guards
import PermissionGuard from 'src/users/auth/role.guard';
import { JwtAuthGraphQLGuard } from 'src/users/auth/jwt-auth-graphql.guard';
//inputs
import { CreatePolicyInput, PolicyPaginationInput, UpdatePolicyInput } from '../dto/policy-input.dto';
//payloads
import { PoliciesPayload, PolicyPayload } from '../dto/policy-payload.dto';
//entities
import { Copay } from '../entities/copay.entity';
import { Policy } from '../entities/policy.entity';
import { Insurance } from '../entities/insurance.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { PolicyHolder } from '../entities/policy-holder.entity';
//services
import { CopayService } from '../services/copay.service';
import { PolicyService } from '../services/policy.service';
import { InsuranceService } from '../services/insurance.service';
import { DoctorService } from 'src/providers/services/doctor.service';
import { PatientService } from 'src/patients/services/patient.service';
import { PolicyHolderService } from '../services/policy-holder.service';

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

  //queries

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

  //mutations

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

  //resolve fields

  @ResolveField(() => [PolicyHolder])
  async policyHolder(@Parent() policy: Policy): Promise<PolicyHolder> {
    return await this.policyHolderService.findOne(policy.policyHolderId)
  }

  @ResolveField(() => [Patient])
  async patient(@Parent() policy: Policy): Promise<Patient> {
    return await this.patientService.findOne(policy.patientId)
  }

  @ResolveField(() => [Insurance])
  async insurance(@Parent() policy: Policy): Promise<Insurance> {
    return await this.insuranceService.findOne(policy.insuranceId)
  }

  @ResolveField(() => [Copay])
  async copays(@Parent() policy: Policy): Promise<Copay[]> {
    if (policy?.id) {
      return await this.copayService.findByPolicyId(policy.id)
    }
  }

  @ResolveField(() => [Doctor])
  async primaryCareProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy?.primaryCareProviderId) {
      return await this.doctorService.findOne(policy.primaryCareProviderId)
    }
  }

  @ResolveField(() => [Doctor])
  async referringProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy?.referringProviderId) {
      return await this.doctorService.findOne(policy.referringProviderId)
    }
  }
}


