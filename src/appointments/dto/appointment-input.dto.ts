import { Field, InputType, PickType, registerEnumType } from '@nestjs/graphql';
import { CalendarViewType } from 'src/lib/constants';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { AppointmentStatus } from '../entities/appointment.entity';

registerEnumType(CalendarViewType, {
    name: "CalendarViewType",
    description: "Calendar View Type "
})
@InputType()
export class AppointmentInput {
    @Field(() => PaginationInput)
    paginationOptions: PaginationInput

    @Field({ nullable: true })
    appointmentNumber?: string

    @Field({ nullable: true })
    appointmentStatus?: AppointmentStatus

    @Field({ nullable: true })
    patientId?: string

    @Field({ nullable: true })
    searchString?: string

    @Field({ nullable: true })
    practiceId?: string

    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    relationTable?: string

    @Field({ nullable: true })
    providerId?: string

    @Field({ nullable: true })
    appointmentTypeId?: string

    @Field({ nullable: true })
    sortBy?: string

    @Field({ nullable: true })
    appointmentDate?: string

    @Field({ nullable: true, defaultValue: false })
    isCheckedIn?: boolean
}

@InputType()
export class UpComingAppointmentsInput extends AppointmentInput {
    @Field({ nullable: true })
    patientId?: string

    @Field({ nullable: true })
    practiceId?: string

    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    providerId?: string

    @Field({ nullable: true, defaultValue: false })
    shouldFetchPast?: boolean
}

@InputType()
export class LastVisitedAppointmentInput {
    @Field({ nullable: true })
    patientId?: string
}

@InputType()
export class FindAllCalendarAppointmentsInput {

    @Field(() => PaginationInput)
    paginationOptions: PaginationInput

    @Field({ nullable: true })
    practiceId?: string

    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    sortBy?: string

    @Field()
    appointmentDate: string

    @Field({ nullable: true })
    providerId?: string

    @Field(() => CalendarViewType)
    currentView: CalendarViewType
}

@InputType()
export class FindAppointmentDateInput extends PickType(FindAllCalendarAppointmentsInput, ['appointmentDate', 'currentView']) { }