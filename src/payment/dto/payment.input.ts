import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaymentInput {
    @Field()
    id: string
}