import { Field, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../entities/appointment.entity';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';

@ObjectType()
export class AppointmentPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    appointment: Appointment;

    @Field({ nullable: true })
    response?: ResponsePayload
}


@ObjectType()
export class PatientPastUpcomingAppointment {
    @Field({ nullable: true })
    pastAppointment: Appointment;

    @Field({ nullable: true })
    upcomingAppointment: Appointment
}

@ObjectType()
export class PatientPastUpcomingAppointmentPayload extends ResponsePayloadResponse {
    @Field(() => PatientPastUpcomingAppointment, { nullable: true })
    appointments: PatientPastUpcomingAppointment
}