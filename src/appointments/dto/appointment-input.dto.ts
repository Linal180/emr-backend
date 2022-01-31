import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class AppointmentInput {

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}