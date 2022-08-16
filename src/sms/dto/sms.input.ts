import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SendSmsInput {

  @Field({ nullable: true })
  message: string

  @Field({ nullable: true })
  to: string
}