import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { QuestionTemplate } from "../entities/questionTemplate.entity";
//entities

@ObjectType()
export class TemplateSectionsInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  specialId: string

  @Field(() => QuestionTemplate, { nullable: true })
  template: QuestionTemplate
}