import { Field, InputType } from '@nestjs/graphql';
import { OnsetDateType, OtherDateType, PatientBillingStatus, PatientPaymentType } from '../entities/billing.entity';
import CodesInput from './codes-input.dto';

@InputType()
export default class BillingInput {
  @Field(type => PatientPaymentType, { nullable: true })
  patientPaymentType?: PatientPaymentType

  @Field(type => PatientBillingStatus, { nullable: true })
  patientBillingStatus?: PatientBillingStatus

  @Field({ nullable: true })
  amount?: string

  @Field(type => OnsetDateType, { nullable: true })
  onsetDateType?: OnsetDateType

  @Field({ nullable: true })
  onsetDate?: string

  @Field(type => OtherDateType, { nullable: true })
  otherDateType?: OtherDateType

  @Field({ nullable: true })
  otherDate?: string

  @Field({ nullable: true })
  employment: boolean;

  @Field({ nullable: true })
  autoAccident: boolean;

  @Field({ nullable: true })
  otherAccident: boolean;

  @Field(() => [CodesInput], { nullable: true })
  codes: CodesInput[]

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  appointmentId?: string
}
