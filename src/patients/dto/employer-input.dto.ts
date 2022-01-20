import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class EmployerInput {

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}