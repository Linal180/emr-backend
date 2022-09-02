import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class ScheduleInput {
    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    doctorId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}