import { ObjectType, Field } from '@nestjs/graphql';
import { ResponsePayloadResponse } from './response-payload.dto';
import { Role, UserRole } from '../entities/role.entity';

@ObjectType()
export default class RolesPayload extends ResponsePayloadResponse {
  @Field(type => [Role], { nullable: 'itemsAndList' })
  roles: Role[]
}

@ObjectType()
export class RoleStates {
  @Field(type => UserRole)
  role: UserRole;

  @Field()
  action: string
}