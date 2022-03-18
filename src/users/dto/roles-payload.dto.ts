import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Role } from '../entities/role.entity';
import { ResponsePayload, ResponsePayloadResponse } from './response-payload.dto';

@ObjectType()
export default class RolesPayload extends ResponsePayloadResponse {
  @Field(type => [Role], { nullable: 'itemsAndList' })
  roles: Role[]

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload
}

@ObjectType()
export class RoleStates {
  @Field()
  role: string;

  @Field()
  action: string
}

@ObjectType()
export class RolePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    role: Role;

    @Field({ nullable: true })
    response?: ResponsePayload
}
