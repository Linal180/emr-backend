import { Field, ObjectType } from "@nestjs/graphql";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { Form } from "../entities/form.entity";
import { UserForms } from '../entities/userforms.entity'

@ObjectType()
export class UserFormPayload {
    @Field(() => UserForms, { nullable: true })
    userForm: UserForms;

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
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