import { Field, InputType } from "@nestjs/graphql";
//user imports
import { ElementType } from "../entities/element.entity";

//input types
@InputType()
export class ElementInputs {
      @Field(type => ElementType)
      type: ElementType
}