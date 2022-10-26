import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs


@InputType()
export class CreateMacroInput {
  @Field({ nullable: true })
  shortcut: string

  @Field(() => [String], { nullable: true })
  section: string[]

  @Field({ nullable: true })
  expansion: string
}

@InputType()
export class UpdateMacroInput extends PartialType(CreateMacroInput) {
  @Field()
  id: string;
}

@InputType()
export class GetMacroInput extends PickType(UpdateMacroInput, ['id'] as const) { }

@InputType()
export class RemoveMacroInput extends PickType(UpdateMacroInput, ['id'] as const) { }