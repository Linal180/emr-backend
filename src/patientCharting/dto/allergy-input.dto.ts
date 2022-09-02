import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class AllergyInput {
    @Field({ nullable: true })
    allergyType?: string

    @Field({ nullable: true })
    allergyName?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}