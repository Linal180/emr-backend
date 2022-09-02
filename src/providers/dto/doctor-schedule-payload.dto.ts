import { Field, ObjectType } from '@nestjs/graphql';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Schedule } from '../entities/schedule.entity';

@ObjectType()
export class DoctorSchedulePayload extends ResponsePayloadResponse {
    @Field(type=> [Schedule], { nullable: true })
    schedule: Schedule[];

    @Field({ nullable: true })
    response?: ResponsePayload
}