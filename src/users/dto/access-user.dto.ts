import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { ResponsePayload } from './response-payload.dto';

@ObjectType()
export class AccessUserPayload {
  @Field({ nullable: true })
  access_token?: string

  @Field({ nullable: true })
  access_2fa_token?: string

  @Field({ nullable: true })
  userId?: string

  @Field({nullable: true})
  isTwoFactorEnabled?: boolean

  @Field(type => [Role], { nullable: true })
  roles?: Role[]

  @Field({ nullable: true })
  response?: ResponsePayload
}


@ObjectType()
export class User2FAPayload {
  @Field({ nullable: true })
  access_2fa_token?: string

  @Field({nullable: true})
  isTwoFactorEnabled?: boolean

  @Field({ nullable: true })
  response?: ResponsePayload
}