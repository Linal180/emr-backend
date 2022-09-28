import { Field, InputType } from '@nestjs/graphql';
//entities
import { UpFrontPaymentInputType } from './upFrontPaymentType-input.dto';

@InputType()
export class UpFrontPaymentInput {
  @Field(() => [UpFrontPaymentInputType], { nullable: true })
  upFrontPaymentTypes: UpFrontPaymentInputType[]

  @Field({ nullable: true })
  totalCharges: string
  
  @Field({ nullable: true })
  expected: string
  
  @Field({ nullable: true })
  balance: string
  
  @Field({ nullable: true })
  paid: string
  
  @Field({ nullable: true })
  adjustments: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  appointmentId?: string
}