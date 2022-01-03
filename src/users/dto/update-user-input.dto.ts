import { InputType, Field, PartialType, OmitType, PickType } from "@nestjs/graphql";
import { RegisterUserInput } from "./register-user-input.dto";

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(RegisterUserInput, ['password', 'roleType'] as const),
) {
  @Field()
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  emailVerified?: boolean;
}
@InputType()
export class GetUser extends PickType(UpdateUserInput, ['id'] as const) { }
@InputType()
export class ResendVerificationEmail extends PickType(UpdateUserInput, ['email'] as const) { }