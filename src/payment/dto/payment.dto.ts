import { Field, ObjectType } from "@nestjs/graphql";
import { Appointment } from "src/appointments/entities/appointment.entity";
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from "src/users/dto/response-payload.dto";
import { Transactions } from '../entity/payment.entity'
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

@ObjectType()
export class TransactionsPayload extends ResponsePayloadResponse {
    @Field(() => [Transactions], { nullable: 'itemsAndList' })
    transactions: Transactions[];

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
@ObjectType()
export class TransactionPayload extends ResponsePayloadResponse {
    @Field(() => Transactions)
    transaction: Transactions;

}