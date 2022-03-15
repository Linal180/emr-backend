import { Field, InputType } from '@nestjs/graphql';
//user imports
import { BILLING_TYPE, STATUS } from '../entity/invoice.entity';
//inputs
@InputType()
export class CreateInvoiceInputs {
  @Field({ nullable: false })
  transactionId: string;

  @Field({ nullable: false })
  generatedBy: string;

  @Field(() => BILLING_TYPE)
  billingType: BILLING_TYPE;

  @Field({ nullable: false })
  paymentMethod: string;

  @Field(() => STATUS)
  status: STATUS;

  @Field({ nullable: false })
  amount: string;
}
