import { Field, InputType } from '@nestjs/graphql';
import { CreateAppointmentInput } from '../../appointments/dto/create-appointment.input';

@InputType()
export class PaymentInput extends CreateAppointmentInput {
  @Field()
  clientIntent: string;

  @Field()
  amount: string;
}

@InputType()
export class CreateTransactionInputs {
  @Field({ nullable: false })
  transactionId: string;

  @Field({ nullable: false })
  patientId: string;

  @Field({ nullable: false })
  doctorId: string;

  @Field({ nullable: false })
  facilityId: string;

  @Field({ nullable: false })
  appointmentId: string;
}
