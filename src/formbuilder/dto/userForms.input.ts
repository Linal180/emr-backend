import { Field, InputType } from "@nestjs/graphql";
//user import
import PaginationInput from "src/pagination/dto/pagination-input.dto"
import { UserFormElementInputs } from "./userFormElements.input";

@InputType()
export class UserFormInput {

    @Field()
    FormId: string

    @Field(() => PaginationInput)
    paginationOptions: PaginationInput

}

@InputType()
export class CreateUserFormInput {

    @Field({ nullable: true })
    PatientId: string

    @Field({ nullable: true })
    DoctorId: string

    @Field({ nullable: true })
    StaffId: string

    @Field({ nullable: false })
    FormId: string;

    @Field({ nullable: true })
    SubmitterId: string;

    @Field(() => [UserFormElementInputs])
    userFormElements: UserFormElementInputs[];
}




