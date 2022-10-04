import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SelectorType {

  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
  
}