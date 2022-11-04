import { Field, ObjectType } from "@nestjs/graphql";
//payloads
import { TemplateSections } from "../entities/templateSections.entity";
//entities

@ObjectType()
export class SectionQuestionsInput {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  specialId: string

  @Field(() => TemplateSections, { nullable: true })
  section: TemplateSections
}