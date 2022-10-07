import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { ResponsePayload } from "src/users/dto/response-payload.dto";
//entities
import { TemplateSections } from "../entities/templateSections.entity";

@ObjectType()
export class TemplateSectionsPayload {
  @Field(() => [TemplateSections], { nullable: 'itemsAndList' })
  sections: TemplateSections[];

  @Field(() => ResponsePayload, { nullable: true })
  response?: ResponsePayload;
}