import { Field, Int, ObjectType } from "@nestjs/graphql";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";

@ObjectType()
export class SelectOptions {

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class PracticeDate extends SelectOptions {

  @Field({ nullable: true })
  date: string
}

@ObjectType()
export class FacilitiesUser extends SelectOptions {

  @Field({ nullable: true })
  usersCount: number
}

@ObjectType()
export class PracticeFacilities extends SelectOptions {

  @Field({ nullable: true })
  facility: number;

}

@ObjectType()
export class PracticeUsers extends SelectOptions {

  @Field(() => Number, { nullable: true })
  userCount: number
}


@ObjectType()
export class PracticesViaDate {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => Int, { nullable: true })
  count: number;

  @Field({ nullable: true })
  name: string;
}

//payloads

@ObjectType()
export class PracticeFacilitiesPayload {

  @Field(() => [PracticeFacilities], { nullable: true })
  practiceFacilities: PracticeFacilities[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}

@ObjectType()
export class PracticeUsersPayload {

  @Field(() => [PracticeUsers], { nullable: true })
  practiceUsers: PracticeUsers[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}


@ObjectType()
export class ActiveInactivePracticesPayload {

  @Field(() => Int, { nullable: true })
  activePractices: number

  @Field(() => Int, { nullable: true })
  inactivePractices: number

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}

@ObjectType()
export class PracticesViaDatePayload {

  @Field(() => [PracticesViaDate], { nullable: true })
  practices: PracticesViaDate[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}