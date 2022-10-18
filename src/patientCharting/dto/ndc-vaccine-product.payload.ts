import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { NdcVaccineProduct } from "../entities/ndcVaccineProduct.entity";



@ObjectType()
export class FindAllNdcVaccineProductsPayload {

  @Field(() => [NdcVaccineProduct], { nullable: true })
  ndcVaccineProducts: NdcVaccineProduct[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination: PaginationPayload;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;

}