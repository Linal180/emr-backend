import { Field, InputType } from '@nestjs/graphql';
import { OnsetDateType, OtherDateType } from '../entities/billing.entity';
import CodesInput from './codes-input.dto';

@InputType()
export default class ClaimInput {
  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field(() => [CodesInput], { nullable: true })
  codes: CodesInput[]

  @Field({ nullable: true })
  employment: boolean;

  @Field({ nullable: true })
  autoAccident: boolean;

  @Field({ nullable: true })
  otherAccident: boolean;

  @Field(type => OnsetDateType, { nullable: true })
  onsetDateType?: OnsetDateType

  @Field({ nullable: true })
  onsetDate?: string

  @Field(type => OtherDateType, { nullable: true })
  otherDateType?: OtherDateType

  @Field({ nullable: true })
  otherDate?: string

  @Field({ nullable: true })
  from?: string

  @Field({ nullable: true })
  to?: string
}
