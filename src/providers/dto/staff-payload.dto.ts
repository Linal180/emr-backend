import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ResponsePayload } from '../../users/dto/response-payload.dto';
import { Staff } from '../entities/staff.entity';

@ObjectType()
export class StaffPayload {
    @Field({ nullable: true })
    staff: Staff;

    @Field({ nullable: true })
    response?: ResponsePayload
}