import { InputType, Field, PickType } from "@nestjs/graphql";
import { UpdateUserInput } from "./update-user-input.dto";

@InputType()
export class UpdateRoleInput extends PickType(UpdateUserInput, ['id'] as const) {
  @Field(type => [String])
  roles: string[];
}

@InputType()
export class UpdateUserPhaseInput extends PickType(UpdateUserInput, ['id'] as const) {
  @Field()
  phaseId: string;
}
