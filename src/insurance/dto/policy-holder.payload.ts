import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { PolicyHolder } from '../entities/policy-holder.entity';
import { Response } from './insurances-payload.dto';

@ObjectType()
export class PolicyHoldersPayload{
  @Field(type => [PolicyHolder])
  policyHolders: PolicyHolder[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type=>Response,{nullable:true})
  response?:Response
}
