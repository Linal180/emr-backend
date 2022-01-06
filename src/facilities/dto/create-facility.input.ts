import { InputType, Field } from '@nestjs/graphql';
import { PracticeType, ServiceCode } from '../entities/facility.entity';

@InputType()
export class CreateFacilityInput {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  stateImmunizationId?: string;

  @Field(type => PracticeType, { description: 'Facility type', nullable: true })
  practiceType?: PracticeType;

  @Field(type => ServiceCode, { description: 'Service Code type', nullable: true })
  serviceCode?: ServiceCode;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  cliaIdNumber?: string;

  @Field({ nullable: true })
  federalTaxId?: string;

  @Field({ nullable: true })
  revenueCode?: string;

  @Field({ nullable: true })
  tamxonomyCode?: string;

  @Field({ nullable: true })
  insurancePlanType?: string;

  @Field({ nullable: true })
  mammographyCertificationNumber?: string;

  @Field({ nullable: true })
  npi?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  pager?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  fax?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  address2?: string;

  @Field({ nullable: true })
  zipCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  facilityId?: string;


}