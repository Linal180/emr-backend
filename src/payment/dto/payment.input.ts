import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { TRANSACTIONSTATUS } from '../entity/payment.entity';

@InputType()
export class PaymentInput {
  @Field({ nullable: true })
  clientIntent: string;

  @Field()
  price: string;

  @Field({ nullable: true })
  providerId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field()
  patientId: string;

  @Field()
  appointmentId: string;

  @Field()
  serviceId: string

}

@InputType()
export class PaymentInputsAfterAppointment {
  @Field()
  clientIntent: string;

  @Field()
  price: string;

  @Field({ nullable: true })
  providerId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field()
  patientId: string;

  @Field()
  appointmentId: string;
}

@InputType()
export class CreateTransactionInputs {
  @Field({ nullable: true })
  transactionId: string;

  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: true })
  doctorId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field({ nullable: false })
  appointmentId: string;

  @Field(() => TRANSACTIONSTATUS)
  status: TRANSACTIONSTATUS;
}

@InputType()
export class UpdatePaymentStatus {
  @Field({ nullable: false })
  transactionId: string;

  @Field(() => TRANSACTIONSTATUS)
  status: TRANSACTIONSTATUS;
}

@InputType()
export class GetAllTransactionsInputs {

  @Field({ nullable: true })
  facilityId?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}


@InputType()
export class ACHPaymentInputs {

  @Field({ nullable: false })
  token: string

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: false })
  price: string

  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: true })
  doctorId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field({ nullable: false })
  appointmentId: string;

  @Field({ nullable: true })
  company: string;

}

@InputType()
export class PaymentInputs {

  @Field()
  paymentMethodNonce: string;

  @Field()
  customerId: string;
}