import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AppointmentReminderInput {
    @Field({ nullable: true })
    appointmentId?: string

    @Field({ nullable: true })
    timeZone?: string
}