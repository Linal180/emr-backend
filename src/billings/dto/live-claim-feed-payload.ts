import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/appointments/entities/appointment.entity";
import { PolicyHolder } from "src/insurance/entities/policy-holder.entity";
import { Policy } from "src/insurance/entities/policy.entity";
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { Patient } from "src/patients/entities/patient.entity";
import { Doctor } from "src/providers/entities/doctor.entity";
import { ResponsePayload } from "src/users/dto/response-payload.dto";
import { Billing } from "../entities/billing.entity";
import { LiveClaimFeed } from "../entities/liveClaimFeed.entity";

@ObjectType()
export class LiveClaimFeedPayload {
  @Field(() => [LiveClaimFeed], { nullable: true })
  liveClaimFeeds: LiveClaimFeed[]

  @Field(() => PaginationPayload, { nullable: true })
  pagination: PaginationPayload

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload
}