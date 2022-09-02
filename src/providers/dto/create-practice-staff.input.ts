import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePracticeStaffInput {

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: false })
  email: string;
  
  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ description: 'Send Investor Type from the string - Sign-up', nullable: true })
  roleType?: string;

  @Field({ nullable: true })
  facilityId?: string;
}