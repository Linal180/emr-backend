import { ObjectType, Field } from '@nestjs/graphql';
import { ResponsePayload } from './response-payload.dto';
import { Role } from '../entities/role.entity';
import { UserToRole } from '../entities/user-role.entity';

@ObjectType()
export class AccessUserPayload {
  @Field({ nullable: true })
  access_token?: string

  @Field(type => [UserToRole], { nullable: true })
  roles: UserToRole[]

  @Field({ nullable: true })
  response?: ResponsePayload
}
