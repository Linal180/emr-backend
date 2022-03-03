import { Field, InputType } from '@nestjs/graphql';
import { PracticeType, ServiceCode } from '../entities/facility.entity';

@InputType()
export class CreateFacilityItemInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  stateImmunizationId?: string;

  @Field(type => PracticeType, { description: 'Facility type', nullable: true })
  practiceType?: PracticeType;

  @Field(type => ServiceCode, { description: 'Service Code type', nullable: true })
  serviceCode?: ServiceCode;

  @Field({ nullable: true })
  cliaIdNumber?: string;

  @Field({ nullable: true })
  timeZone?: string;

  @Field({ nullable: true })
  practiceId?: string;

  @Field({nullable: true, defaultValue: true})
  isPrimary?: boolean

  @Field({ nullable: true })
  federalTaxId?: string

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  tamxonomyCode?: string;

  @Field({ nullable: true })
  mammographyCertificationNumber?: string;

  @Field({ nullable: true })
  npi?: string;
}