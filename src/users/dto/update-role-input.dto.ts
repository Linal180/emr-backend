import { InputType, Field, PickType } from "@nestjs/graphql";
import { UserRole } from "../entities/role.entity";
import { UpdateUserInput } from "./update-user-input.dto";

@InputType()
export class UpdateRoleInput extends PickType(UpdateUserInput, ['id'] as const) {
  @Field(type => [UserRole])
  roles: UserRole[];
}

@InputType()
export class UpdateUserPhaseInput extends PickType(UpdateUserInput, ['id'] as const) {
  @Field()
  phaseId: string;
}
