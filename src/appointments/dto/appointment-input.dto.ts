import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { AppointmentStatus } from '../entities/appointment.entity';

@InputType()
export default class AppointmentInput {
    @Field(type => PaginationInput)
    paginationOptions: PaginationInput

    @Field({nullable: true})
    appointmentNumber?: string

    @Field({nullable: true})
    appointmentStatus?: AppointmentStatus

    @Field({nullable: true})
    patientId?: string

    @Field({nullable: true})
    searchString?: string

    @Field({nullable: true})
    practiceId?: string

    @Field({nullable: true})
    facilityId?: string

    @Field({nullable: true})
    relationTable?: string
}
