import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from 'src/users/entities/role.entity';

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

  @Field(type => UserRole, { description: 'Send Investor Type from the ENUM - Sign-up', nullable: true })
  roleType?: UserRole;

  @Field({ nullable: true })
  facilityId?: string;
}