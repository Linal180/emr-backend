import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/appointments/entities/appointment.entity";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { Form } from "../entities/form.entity";
import { UserForms } from '../entities/userforms.entity'

@ObjectType()
export class UserFormPayload {
    @Field(() => UserForms, { nullable: true })
    userForm: UserForms;

    @Field(() => Appointment, { nullable: true })
    appointment?: Appointment

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}

@ObjectType()
export class AppointmentUserForm{
    @Field(() => UserForms, { nullable: true })
    userForm: UserForms;

    @Field(() => Appointment, { nullable: true })
    appointment?: Appointment
}

@ObjectType()
export class UserFormsPayload {

    @Field(() => Form, { nullable: true })
    form: Form;

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}

@ObjectType()
export class FormAttachmentPayload {
    @Field({ nullable: true })
    attachment: String;

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}

@ObjectType()
export class FormMediaPayload {
    @Field({ nullable: true })
    publicUrl: String;

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}