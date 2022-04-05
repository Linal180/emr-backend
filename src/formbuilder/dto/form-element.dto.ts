import { Field, ObjectType } from "@nestjs/graphql";
//user imports
import { FormElement } from "../entities/form-elements.entity";
import { ResponsePayload } from '../../customDecorators/response-payload.dto';
//response
@ObjectType()
export class FormElementPayload {

  @Field({ nullable: true })
  element: FormElement;

  @Field({ nullable: true })
  response?: ResponsePayload

}
