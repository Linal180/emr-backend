import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entity
import { FeeSchedule } from "../entities/feeSchedule.entity";


@ObjectType()
export class AllFeeSchedulesPayload {
  @Field(() => [FeeSchedule], { nullable: 'itemsAndList' })
  feeSchedules: FeeSchedule[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}



@ObjectType()
export class FeeSchedulePayload {
  @Field(() => FeeSchedule, { nullable: true })
  feeSchedule: FeeSchedule;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}