import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";

@ObjectType()
export class PracticeFacilities {

    @Field({ nullable: true })
    id: string;

    @Field({ nullable: true })
    facility: number;

    @Field({ nullable: true })
    name: string;

}


@ObjectType()
export class PracticeFacilitiesPayload {
    @Field(() => [PracticeFacilities], { nullable: true })
    practiceFacilities: PracticeFacilities[]

    @Field({ nullable: true })
    response: ResponsePayloadResponse
}