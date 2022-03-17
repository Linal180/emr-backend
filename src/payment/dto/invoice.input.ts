import { Field, InputType } from '@nestjs/graphql';
//user imports
import { BILLING_TYPE, STATUS } from '../entity/invoice.entity';
import { TRANSACTIONSTATUS } from '../entity/payment.entity';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
//inputs
@InputType()
export class CreateInvoiceInputs {
  @Field({ nullable: true })
  paymentTransactionId: string;

  @Field({ nullable: false })
  facilityId: string;

  @Field({ nullable: true })
  generatedBy?: string;

  @Field(() => BILLING_TYPE)
  billingType: BILLING_TYPE;

  @Field({ nullable: true })
  paymentMethod: string;

  @Field(() => STATUS)
  status: STATUS;

  @Field({ nullable: false })
  amount: string;
}

@InputType()
export class CreateExternalInvoiceInputs {
  @Field({ nullable: false })
  paymentTransactionId: string;

  @Field({ nullable: false })
  facilityId: string;

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


@InputType()
export class InvoiceInputs {

  @Field({ nullable: true })
  facilityId?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
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