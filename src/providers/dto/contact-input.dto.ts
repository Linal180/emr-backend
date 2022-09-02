import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class ContactInput {
    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true, defaultValue: false })
    primaryContact?: boolean

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}