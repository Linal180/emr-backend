import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { BillingStatus } from '../entities/appointment.entity';
import { CreateAppointmentInput } from './create-appointment.input';

@InputType()
export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  @Field()
  id: string;

  @Field({nullable: true})
  paymentStatus?: string;
}

@InputType()
export class UpdateAppointmentPayStatus {
  @Field()
  id: string;
  
  @Field({nullable: true})
  paymentStatus: string;
}

@InputType()
export class UpdateAppointmentBillingStatusInput {
  @Field()
  id: string;

  @Field({nullable: false})
  billingStatus: BillingStatus
}


@InputType()
export class GetAppointment extends PickType(UpdateAppointmentInput, ['id'] as const) { }

@InputType()
export class GetDoctorAppointment {
  @Field()
  doctorId: string
 }

@InputType()
export class RemoveAppointment extends PickType(UpdateAppointmentInput, ['id'] as const) { }

@InputType()
export class CancelAppointment {
  @Field()
  token: string

  @Field()
  reason: string
 }
