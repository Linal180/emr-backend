import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Permission } from '../entities/permissions.entity';
import { ResponsePayload, ResponsePayloadResponse } from './response-payload.dto';

@ObjectType()
export default class PermissionsPayload extends ResponsePayloadResponse {
  @Field(type => [Permission], { nullable: 'itemsAndList' })
  permissions: Permission[]

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload
}

@ObjectType()
export class PermissionPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    permission: Permission;

    @Field({ nullable: true })
    response?: ResponsePayload
}
