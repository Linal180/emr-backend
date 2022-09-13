import { Field, InputType, PartialType } from "@nestjs/graphql";


@InputType()
export class CreateFamilyHistoryInput {

	@Field({ nullable: true })
	name: string
}


@InputType()
export class UpdateFamilyHistoryInput extends PartialType(CreateFamilyHistoryInput) {
  @Field({nullable: true})
  id: string;
}