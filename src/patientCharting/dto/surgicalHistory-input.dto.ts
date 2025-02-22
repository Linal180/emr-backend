import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class SurgicalHistoryInput {
    @Field({ nullable: true })
    patientId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}