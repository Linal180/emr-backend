import { Field, ObjectType } from '@nestjs/graphql';
import { Staff } from 'src/providers/entities/staff.entity';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Practice } from '../entities/practice.entity';

@ObjectType()
export class PracticePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    practice: Practice;

    @Field({ nullable: true })
    practiceAdmin?: Staff;

    @Field({ nullable: true })
    response?: ResponsePayload
}
