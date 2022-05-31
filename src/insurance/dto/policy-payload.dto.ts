import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Policy } from '../entities/policy.entity';
import { Response } from './insurances-payload.dto';

@ObjectType()
export class PoliciesPayload{
  @Field(type => [Policy])
  policies: Policy[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type=>Response,{nullable:true})
  response?:Response
}

@ObjectType()
export class PolicyPayload{
  @Field(type => Policy)
  policy: Policy;

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type=>Response,{nullable:true})
  response?:Response
}
