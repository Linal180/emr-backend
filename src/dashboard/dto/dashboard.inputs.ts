import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PracticeUsersInputs {

    @Field({ nullable: true })
    practiceId: string;

}