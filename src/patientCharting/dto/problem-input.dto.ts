import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientProblemInput {
    @Field({ nullable: true })
    patientId?: string

    @Field({ nullable: true })
    appointmentId?: string

    @Field({ nullable: true })
    forOrders?: boolean

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}