import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { ResponsePayload } from './response-payload.dto';

@ObjectType()
export class UserPayload {
  @Field({ nullable: true })
  user: User;

  @Field({ nullable: true })
  access_token?: string

  @Field({ nullable: true })
  response?: ResponsePayload
}
