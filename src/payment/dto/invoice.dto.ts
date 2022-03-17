import { Field, ObjectType } from "@nestjs/graphql";
//user imports
import { ResponsePayloadResponse,ResponsePayload } from "src/users/dto/response-payload.dto";
import { Invoice } from "../entity/invoice.entity";
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
//payload
 @ObjectType()
export class InvoicePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    invoice?: Invoice;

    @Field({ nullable: true })
    response?: ResponsePayload
}


@ObjectType()
export class InvoicesPayload extends ResponsePayloadResponse {
    @Field(type => [Invoice], { nullable: 'itemsAndList' })
    invoices: Invoice[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}