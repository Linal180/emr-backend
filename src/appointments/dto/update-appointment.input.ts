import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import { APPOINTMENTSTATUS, BillingStatus } from '../entities/appointment.entity';
import { CreateAppointmentInput } from './create-appointment.input';

@InputType()
export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  @Field()
  id: string;

  @Field({nullable: true})
  paymentStatus?: string;
}

@InputType()
export class UpdateAppointmentStatusInput {
  @Field()
  id: string;

  @Field(()=>APPOINTMENTSTATUS,{nullable: false})
  status: APPOINTMENTSTATUS
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
export class GetAppointments {
  @Field({nullable: true})
  doctorId: string

  @Field({nullable: true})
  facilityId: string
 }

 @InputType()
export class GetPatientAppointmentInput {
  @Field()
  patientId: string
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
