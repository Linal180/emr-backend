import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Patient } from 'src/patients/entities/patient.entity';
import { Doctor } from 'src/providers/entities/doctor.entity';
import { PolicyEligibility } from '../entities/policy-eligibility.entity';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { Policy } from '../entities/policy.entity';
import { Response } from './insurances-payload.dto';

@ObjectType()
export class PolicyEligibilitiesPayload {
  @Field(() => [PolicyEligibility])
  policyEligibilities: PolicyEligibility[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class PolicyEligibilityPayload {
  @Field(() => PolicyEligibility)
  policyEligibility: PolicyEligibility;

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}


@ObjectType()
export class PolicyEligibilityWithPatientPayload {
  @Field(() => PolicyEligibility)
  policyEligibility: PolicyEligibility;

  @Field(() => PolicyHolder)
  policyHolder: PolicyHolder;

  @Field(() => Patient)
  patient: Patient;

  @Field(() => Doctor)
  primaryProvider: Doctor;

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}