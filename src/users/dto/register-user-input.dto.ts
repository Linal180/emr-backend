import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../entities/role.entity';

@InputType()
export class RegisterUserInput {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field()
  password: string;
  @Field()
  email: string;
  @Field(type => UserRole, { description: 'Send Investor Type from the ENUM - Sign-up', nullable: true })
  roleType?: UserRole;
  @Field({ nullable: true })
  adminId?: string;
  @Field({ nullable: true })
  facilityId?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  zipCode?: string;
}
