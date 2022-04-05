import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientProblemInput {
    @Field({ nullable: true })
    patientId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}