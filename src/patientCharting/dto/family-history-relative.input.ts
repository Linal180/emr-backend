import { Field, InputType, PartialType } from "@nestjs/graphql";


@InputType()
export class CreateFamilyHistoryRelativeInput {
  @Field({ nullable: true })
  relativeName: string

  @Field({ nullable: true })
  onsetAge: string

  @Field({ nullable: true })
  died: string

  @Field({ nullable: true })
  notes: string
}


@InputType()
export class UpdateFamilyHistoryRelativeInput extends PartialType(CreateFamilyHistoryRelativeInput) {
  @Field({ nullable: true })
  id: string;
}