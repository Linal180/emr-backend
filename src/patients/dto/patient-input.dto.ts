import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientInput {

    @Field({ nullable: true })
    facilityId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}