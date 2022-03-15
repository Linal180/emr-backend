import { Field, ObjectType } from "@nestjs/graphql";
//user imports
import { ResponsePayloadResponse,ResponsePayload } from "src/users/dto/response-payload.dto";
import { Invoice } from "../entity/invoice.entity";
//payload
 @ObjectType()
export class InvoicePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    invoice?: Invoice;

    @Field({ nullable: true })
    response?: ResponsePayload
}