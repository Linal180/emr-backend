import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { Vaccine } from "../entities/vaccines.entity";


@ObjectType()
export class VaccinePayload {

  @Field({ nullable: true })
  vaccine: Vaccine;

  @Field({ nullable: true })
  response?: ResponsePayloadResponse

}


@ObjectType()
export class FindAllVaccinesPayload {

  @Field(() => [Vaccine], { nullable: true })
  vaccines: Vaccine[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse;

}