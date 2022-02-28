import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class BraintreePayload {
    @Field()
    clientToken: string;
    success: boolean;
}