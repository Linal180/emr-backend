import { InputType, Field } from '@nestjs/graphql';
import { PracticeType } from '../entities/facility.entity';

@InputType()
export class CreateFacilityInput {

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  fax?: string;

  @Field({ nullable: true })
  stateImmunizationId?: string;

  @Field({ nullable: false })
  practiceType: PracticeType;

  @Field({ nullable: true })
  federalTaxId?: string;

  @Field({ nullable: true })
  checkPayableTo?: string;

  @Field({ nullable: true })
  bankAccount?: string;

  @Field({ nullable: true })
  revenueCode?: string;

  @Field({ nullable: true })
  tamxonomyCode?: string;

  @Field({ nullable: true })
  pos?: string;

  @Field({ nullable: true })
  merchantId?: string;

  @Field({ nullable: true })
  hpsaModifier?: string;

  @Field({ nullable: true })
  serviceLocationQualifies?: string;

  @Field({ nullable: true })
  excludeChargesFromPatient?: string;

  @Field({ nullable: true })
  npi?: string;

}