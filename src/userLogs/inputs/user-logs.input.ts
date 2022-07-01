import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserLogInput {

  @Field({ nullable: true })
  operationName?: string

  @Field({ nullable: true })
  facilityId?: string;

  @Field({ nullable: true })
  practiceId?: string;

  @Field({ nullable: true })
  ipAddress?: string;

  @Field({ nullable: true })
  responseCode?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  moduleType?: string

  @Field({ nullable: true })
  operationType?: string

  @Field({ nullable: true })
  refererUrl?: string

  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  activityPayload?: string

}