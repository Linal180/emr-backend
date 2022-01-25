import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFacilityItemInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  stateImmunizationId?: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  cliaIdNumber?: string;

  @Field({ nullable: true })
  timeZone?: string;

  @Field({ nullable: true })
  federalTaxId?: string;

  @Field({ nullable: true })
  revenueCode?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  tamxonomyCode?: string;

  @Field({ nullable: true })
  insurancePlanType?: string;

  @Field({ nullable: true })
  mammographyCertificationNumber?: string;

  @Field({ nullable: true })
  npi?: string;
}