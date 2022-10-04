import { Field, InputType } from '@nestjs/graphql';
//entities
import { OnsetDateType, OtherDateType } from '../entities/billing.entity';

@InputType()
export class UpFrontPaymentInputType {
  @Field({ nullable: true })
  amount?: string

  @Field({ nullable: true })
  type?: string

  @Field({ nullable: true })
  copayType?: string

  @Field({ nullable: true })
  dueAmount?: string

  @Field({ nullable: true })
  paymentType?: string

  @Field({ nullable: true })
  notes?: OtherDateType
}