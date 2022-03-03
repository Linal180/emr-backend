import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class BraintreePayload {
    @Field()
    clientToken: string;
    success: boolean;
}


@ObjectType()
export class BraintreeChargePayload {
    @Field()
    success: boolean
}

@ObjectType()
export class ServicePayload {
    @Field()
    price: string
}