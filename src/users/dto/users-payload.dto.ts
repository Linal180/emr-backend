import { ObjectType, Field, Int } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { User } from 'src/users/entities/user.entity';
import { ResponsePayloadResponse } from './response-payload.dto';

@ObjectType()
export class UsersPayload extends ResponsePayloadResponse {
  @Field(type => [User], { nullable: 'itemsAndList' })
  users: User[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload
}
