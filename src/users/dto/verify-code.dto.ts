import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VerifyCodeInput {
  @Field({ nullable: true })
  id?: string

  @Field({ nullable: false })
  otpCode: string
}


@InputType()
export class SeneOTPAgainInput {
  @Field({ nullable: false })
  id: string
}
