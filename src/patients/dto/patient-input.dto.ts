import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientInput {
    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    searchString?: string

    @Field({ nullable: true })
    dob?: string

    @Field({ nullable: true })
    appointmentDate?: string

    @Field({ nullable: true })
    doctorId?: string

    @Field({ nullable: true })
    patientRecord?: string

    @Field({ nullable: true })
    practiceId?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class DoctorPatientsInput {

    @Field({ nullable: true })
    doctorId: string

    @Field(() => PaginationInput)
    paginationOptions: PaginationInput
}