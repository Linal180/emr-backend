import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientService } from 'src/patients/services/patient.service';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { DoctorService } from 'src/providers/services/doctor.service';
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
  async fetchAllPolicies(@Args('policyInput') policyInput: PolicyPaginationInput): Promise<PoliciesPayload> {
    const policies = await this.policyService.findAll(policyInput)
    return {
      ...policies,
      response: { status: 200, message: 'Policies data fetched successfully' }
    }
  }

  @Query(() => PolicyPayload)
  async fetchPolicy(@Args('id') id: string): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.findById(id),
      response: { status: 200, message: "Policies matching id fetched successfully" }
    };
  }

  @Mutation(() => PolicyPayload)
  async createPolicy(@Args('createPolicyInput') createPolicyInput: CreatePolicyInput): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.create(createPolicyInput),
      response: { status: 200, message: "Policy created successfully" }
    };
  }

  @Mutation(() => PolicyPayload)
  async updatePolicy(@Args('updatePolicyInput') updatePolicyInput: UpdatePolicyInput): Promise<PolicyPayload> {
    return {
      policy: await this.policyService.update(updatePolicyInput),
      response: { status: 200, message: "Policy updated successfully" }
    };
  }

  @ResolveField((returns) => [PolicyHolder])
  async policyHolder(@Parent() policy: Policy): Promise<PolicyHolder> {
    return this.policyHolderService.findOne(policy.policyHolderId)
  }

  @ResolveField((returns) => [Patient])
  patient(@Parent() policy: Policy): Promise<Patient> {
    return this.patientService.findOne(policy.patientId)
  }

  @ResolveField((returns) => [Insurance])
  insurance(@Parent() policy: Policy): Promise<Insurance> {
    return this.insuranceService.findOne(policy.insuranceId)
  }

  @ResolveField((returns) => [Copay])
  copays(@Parent() policy: Policy): Promise<Copay[]> {
    if (policy) {
      return this.copayService.findByPolicyId(policy.id)
    }
  }

  @ResolveField((returns) => [Doctor])
  primaryCareProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy) {
      return this.doctorService.findOne(policy.primaryCareProviderId)
    }
  }

  @ResolveField((returns) => [Doctor])
  referringProvider(@Parent() policy: Policy): Promise<Doctor> {
    if (policy) {
      return this.doctorService.findOne(policy.primaryCareProviderId)
    }
  }
}
