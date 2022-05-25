import { Field, Int, ObjectType } from "@nestjs/graphql";
//user import
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { Facility } from "src/facilities/entities/facility.entity";
import { Role } from "src/users/entities/role.entity";

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

  @Field(() => Number, { nullable: true })
  usersCount: number
}

@ObjectType()
export class UserWithRoles {

  @Field(() => Number, { nullable: true })
  count: number;

  @Field({ nullable: true })
  role: string;
}

@ObjectType()
export class FacilitiesUserWithRoles extends SelectOptions {

  @Field(() => [UserWithRoles], { nullable: true })
  users: UserWithRoles[]
}


@ObjectType()
export class PracticeFacilities extends SelectOptions {

  @Field({ nullable: true })
  facility: number;

}

@ObjectType()
export class PracticeUsers extends SelectOptions {

  @Field(() => [FacilitiesUser], { nullable: true })
  facilities: FacilitiesUser[]

  @Field(() => Number, { nullable: true })
  userCount?: number
}

@ObjectType()
export class PracticeUsersWithRoles extends SelectOptions {

  @Field(() => [FacilitiesUserWithRoles], { nullable: true })
  facilities: FacilitiesUserWithRoles[]

  @Field(() => Number, { nullable: true })
  userCount?: number
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

@ObjectType()
export class PracticeUsersWithRolesPayload {

  @Field(() => [PracticeUsersWithRoles], { nullable: true })
  practiceUsers: PracticeUsersWithRoles[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}

@ObjectType()
export class PracticeFacilityAppointmentsPayload {

  @Field(() => [Facility], { nullable: true })
  facilitiesAppointments: Facility[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}

@ObjectType()
export class UsersWithRolesPayload {

  @Field(() => [Role], { nullable: true })
  userRoles: Role[]

  @Field({ nullable: true })
  response: ResponsePayloadResponse
}