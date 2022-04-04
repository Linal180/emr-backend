import { InputType, Field } from '@nestjs/graphql';
import { Gender } from '../entities/staff.entity';

@InputType()
export class CreateStaffItemInput {

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  dob?: string;

  @Field(type => Gender, { description: 'Staff gender', nullable: true })
  gender?: Gender;

  @Field({ description: 'Send Investor Type from the ENUM - Sign-up', nullable: true })
  roleType?: string;

  @Field({ nullable: true })
  adminId?: string;

  @Field({ nullable: true })
  facilityId?: string;
}