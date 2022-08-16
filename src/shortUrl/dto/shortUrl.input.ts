import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateShortUrlInput {

	@Field({ nullable: true })
	longLink: string;

}

@InputType()
export class GetShortUrlInput {

	@Field({ nullable: true })
	urlCode: string;

}

