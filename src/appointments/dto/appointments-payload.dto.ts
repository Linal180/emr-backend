import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Appointment } from '../entities/appointment.entity';

@ObjectType()
export class AppointmentsPayload extends ResponsePayloadResponse {
    @Field(type => [Appointment], { nullable: 'itemsAndList' })
    appointments: Appointment[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}

@ObjectType()
export class UpcomingAppointmentsPayload extends ResponsePayloadResponse {
    @Field(type => [Appointment], { nullable: 'itemsAndList' })
    appointments: Appointment[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
