import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/appointments/entities/appointment.entity";


@ObjectType()
export class BraintreePayload {
    @Field()
    clientToken: string;
    success: boolean;
}


@ObjectType()
export class BraintreeChargePayload extends Appointment {
    @Field()
    success?: boolean;
}

@ObjectType()
export class ServicePayload {
    @Field()
    price: string
}