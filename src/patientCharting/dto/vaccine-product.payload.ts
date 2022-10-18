import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { VaccineProduct } from "../entities/vaccineProduct.entity";



@ObjectType()
export class VaccineProductPayload {

  @Field({ nullable: true })
  vaccineProduct: VaccineProduct;

  @Field({ nullable: true })
  response?: ResponsePayloadResponse

}


@ObjectType()
export class FindAllVaccineProductsPayload {

  @Field(() => [VaccineProduct], { nullable: true })
  vaccineProducts: VaccineProduct[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;

}