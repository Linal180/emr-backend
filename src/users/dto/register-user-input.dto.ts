import { Field, InputType } from '@nestjs/graphql';

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
  @Field( { description: 'string type role - Sign-up', nullable: true })
  roleType?: string;
  @Field({ nullable: true })
  adminId?: string;
  @Field({ nullable: true })
  facilityId?: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  zipCode?: string;
  @Field({ nullable: true })
  isAdmin?: boolean;
}
