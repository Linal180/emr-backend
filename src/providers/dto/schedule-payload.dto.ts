import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ResponsePayload } from '../../users/dto/response-payload.dto';
import { Schedule } from '../entities/schedule.entity';

@ObjectType()
export class SchedulePayload {
    @Field({ nullable: true })
    schedule: Schedule;

    @Field({ nullable: true })
    response?: ResponsePayload
}