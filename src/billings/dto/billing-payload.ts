import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/insurance/dto/insurances-payload.dto';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Billing } from '../entities/billing.entity';

@ObjectType()
export class BillingsPayload {
  @Field(() => [Billing])
  billings: Billing[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class BillingPayload {
  @Field(type => Billing)
  billing: Billing;

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type => Response, { nullable: true })
  response?: Response
}
