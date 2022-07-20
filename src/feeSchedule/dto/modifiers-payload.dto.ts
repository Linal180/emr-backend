import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
//entities
import { Modifier } from "../entities/modifier.entity";

@ObjectType()
export class AllModifiersPayload {
  @Field(() => [Modifier], { nullable: 'itemsAndList' })
  modifiers: Modifier[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}

@ObjectType()
export class ModifierPayload {
  @Field(() => Modifier, { nullable: true })
  modifier: Modifier;

  @Field(() => ResponsePayloadResponse, { nullable: true })
  response?: ResponsePayloadResponse
}