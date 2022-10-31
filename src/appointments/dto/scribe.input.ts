import { Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateScribeInput {
  @Field({ nullable: true })
  appointmentId: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  userType: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;
}


@InputType()
export class UpdateScribeInput extends  PartialType(CreateScribeInput) {
  @Field()
  id: string
}

@InputType()
export class ScribeCheckInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  appointmentId?: string

  @Field({ nullable: true })
  isScribed: boolean
}