import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../entities/role.entity';

@InputType()
export class RegisterUserInput {
  @Field()
  firstName?: string;
  @Field()
  lastName?: string;
  @Field()
  password: string;
  @Field()
  email: string;
  @Field(type => UserRole, { description: 'Send Investor Type from the ENUM - Sign-up', nullable: true })
  roleType?: UserRole;
  @Field()
  adminId?: string;
  @Field()
  facilityId?: string;
  @Field()
  phone?: string;
  @Field()
  zipCode?: string;
}
