import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientTriageNoteInput {
    @Field({ nullable: true })
    patientId?: string

    @Field({ nullable: true })
    appointmentId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}