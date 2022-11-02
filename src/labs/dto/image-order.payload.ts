import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { ImagingOrder } from "../entities/imagingOrder.entity"

@ObjectType()
export class FindAllImagingOrderPayload {
  @Field(() => [ImagingOrder], { nullable: true })
  imagingOrders: ImagingOrder[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class ImagingOrderPayload {
  @Field(() => ImagingOrder, { nullable: true })
  imagingOrder: ImagingOrder;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}