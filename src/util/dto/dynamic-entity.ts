import { Field } from "@nestjs/graphql";

export interface DynamicClassEntity<T> {
  new(name: string): T;
}
export class TwilioInput{
  @Field()
  to: string

  @Field()
  body: string

}