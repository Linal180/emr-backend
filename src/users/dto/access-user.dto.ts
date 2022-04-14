import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { ResponsePayload } from './response-payload.dto';

@ObjectType()
export class AccessUserPayload {
  @Field({ nullable: true })
  access_token?: string

  @Field({nullable: true})
  isTwoFactorEnabled?: boolean

  @Field(type => [Role], { nullable: true })
  roles: Role[]

  @Field({ nullable: true })
  response?: ResponsePayload
}
