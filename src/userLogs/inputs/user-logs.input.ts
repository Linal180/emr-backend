import { Field, InputType } from "@nestjs/graphql";
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class CreateUserLogInput {

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

@InputType()
export class UserLogsInput {

  @Field(() => PaginationInput, { nullable: true })
  paginationOptions: PaginationInput
}