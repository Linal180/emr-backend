import { Field, InputType } from '@nestjs/graphql';
import { CreateExternalAppointmentInput } from '../../appointments/dto/create-external-appointment.input';

@InputType()
export class PaymentInput extends CreateExternalAppointmentInput {
  @Field()
  clientIntent: string;

 
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
