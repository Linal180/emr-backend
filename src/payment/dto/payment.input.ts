import { Field, InputType } from '@nestjs/graphql';
import { CreateExternalAppointmentInput } from '../../appointments/dto/create-external-appointment.input';
import { TRANSACTIONSTATUS } from '../entity/payment.entity'
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class PaymentInput {
  @Field({ nullable: true })
  clientIntent: string;

  @Field()
  price: string;

  @Field()
  providerId: string;

  @Field()
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

  @Field()
  providerId: string;

  @Field()
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

  @Field({ nullable: false })
  doctorId: string;

  @Field({ nullable: false })
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

  @Field()
  token: string

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}

@InputType()
export class PaymentInputs {

  @Field()
  paymentMethodNonce: string;

  @Field()
  customerId: string;
}