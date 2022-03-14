import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientInviteInput {
  @Field()
  id: string

  @Field()
  adminId: string
}