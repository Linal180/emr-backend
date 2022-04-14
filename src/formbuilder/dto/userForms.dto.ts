import { Field, ObjectType } from "@nestjs/graphql";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
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

    @Field(() => [UserForms], { nullable: true })
    userForms: UserForms[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload

    @Field({ nullable: true })
    response?: ResponsePayloadResponse
}