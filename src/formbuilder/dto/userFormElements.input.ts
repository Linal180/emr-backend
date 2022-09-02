import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class ArrayOfStringsTypeInput {

  @Field()
  name: string;

  @Field(() => Boolean)
  value: boolean
}



@InputType()
export class UserFormElementInputs {

  @Field()
  FormsElementsId: string;

  @Field()
  value: string;

  @Field(() => [ArrayOfStringsTypeInput])
  arrayOfObjects: ArrayOfStringsTypeInput[];

  @Field(() => [String])
  arrayOfStrings: string[];

}