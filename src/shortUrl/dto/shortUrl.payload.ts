import { Field, ObjectType } from "@nestjs/graphql";
import { ResponsePayloadResponse } from "src/customDecorators/response-payload.dto";
import { ShortUrl } from "../shortUrl.entity";


@ObjectType()
export class ShortUrlResponse {

	@Field(() => ShortUrl, { nullable: true })
	shortUrl: ShortUrl;

	@Field({ nullable: true })
	response: ResponsePayloadResponse

}