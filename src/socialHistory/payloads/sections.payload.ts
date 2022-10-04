import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import PaginationPayload from "src/pagination/dto/pagination-payload.dto";
import { ResponsePayload } from "src/users/dto/response-payload.dto";
//entities
import { Sections } from "../entities/sections.entity";

@ObjectType()
export class FindAllSectionsPayload {
  @Field(() => [Sections], { nullable: 'itemsAndList' })
  sections: Sections[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload;

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload;
}