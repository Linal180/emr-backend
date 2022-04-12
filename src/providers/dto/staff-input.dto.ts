import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class StaffInput {
    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    practiceId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}