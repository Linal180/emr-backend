import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class PatientMedicationInput {
    @Field({ nullable: true })
    patientId?: string
    
    @Field({ nullable: true })
    appointmentId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class MedicationInput {
    @Field({ nullable: true })
    searchString?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}