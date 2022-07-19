import { Field, InputType } from '@nestjs/graphql';
import { OnsetDateType, OtherDateType, PatientPaymentType } from '../entities/billing.entity';
import CodesInput from './codes-input.dto';

@InputType()
export default class BillingInput {
  @Field(type => PatientPaymentType, { nullable: true })
  patientPaymentType?: PatientPaymentType

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

  @Field({ nullable: true })
  labOrderNumber?: string

  @Field({ nullable: true })
  claimNo?: string

  @Field({ nullable: true })
  serviceDate?: string

  @Field({ nullable: true })
  claimDate?: string

  @Field({ nullable: true })
  pos?: string

  @Field({ nullable: true })
  uncoveredAmount: string;

  @Field({ nullable: true })
  facilityId?: string

  @Field({ nullable: true })
  servicingProviderId?: string

  @Field({ nullable: true })
  renderingProviderId?: string

  @Field({ nullable: true })
  claimStatusId?: string
}
