import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { Response } from './insurances-payload.dto';

@ObjectType()
export class PolicyHoldersPayload {
  @Field(() => [PolicyHolder])
  policyHolders: PolicyHolder[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}
