import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEmployerInput {

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  mobile: string;

  @Field({ nullable: true })
  industry: string;

  @Field({ nullable: true })
  usualOccupation: string;

  @Field({ nullable: true })
  patientId?: string;

}