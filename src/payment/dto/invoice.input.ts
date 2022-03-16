import { Field, InputType } from '@nestjs/graphql';
//user imports
import { BILLING_TYPE, STATUS } from '../entity/invoice.entity';
import { Transactions,TRANSACTIONSTATUS } from '../entity/payment.entity';
//inputs
@InputType()
export class CreateInvoiceInputs {
  @Field({ nullable: false })
  paymentTransactionId: string;

  @Field({ nullable: true })
  generatedBy?: string;

  @Field(() => BILLING_TYPE)
  billingType: BILLING_TYPE;

  @Field({ nullable: false })
  paymentMethod: string;

  @Field(() => STATUS)
  status: STATUS;

  @Field({ nullable: false })
  amount: string;
}


export class TransactionInputs {
  id: string;
  transactionId: string;
  patientId: string;
  doctorId: string;
  facilityId: string;
  appointmentId: string;
  status: TRANSACTIONSTATUS;


}