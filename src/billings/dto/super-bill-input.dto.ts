import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class SuperBillInput {
  @Field({ nullable: true })
  appointmentId?: string
}
