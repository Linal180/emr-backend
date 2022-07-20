import { Field, ObjectType } from "@nestjs/graphql";
//payload
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entity
import { CptFeeSchedule } from "../entities/cptFeeSchedule.entity";

@ObjectType()
export class AllCPTFeeSchedulesPayload {
  @Field(() => [CptFeeSchedule], { nullable: 'itemsAndList' })
  cptFeeSchedules: CptFeeSchedule[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}



@ObjectType()
export class CPTFeeSchedulePayload {
  @Field(() => CptFeeSchedule, { nullable: true })
  cptFeeSchedule: CptFeeSchedule;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}