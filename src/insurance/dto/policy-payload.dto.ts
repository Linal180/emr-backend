import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Policy } from '../entities/policy.entity';
import { Response } from './insurances-payload.dto';

@ObjectType()
export class PoliciesPayload {
  @Field(() => [Policy])
  policies: Policy[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class PolicyPayload {
  @Field(() => Policy)
  policy: Policy;

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}
