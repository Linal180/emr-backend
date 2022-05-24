import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { Facility } from "src/facilities/entities/facility.entity";

@ObjectType()
export class SelectOptions {

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class FacilitiesUser extends SelectOptions  {

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