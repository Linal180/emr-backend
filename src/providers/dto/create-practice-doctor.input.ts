import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePracticeDoctorInput {

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  facilityId?: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  zipCode: string;
}