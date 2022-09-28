import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/insurance/dto/insurances-payload.dto';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { UpFrontPayment } from '../entities/upFrontPayment.entity';

@ObjectType()
export class UpFrontPaymentsPayload {
  @Field(() => [UpFrontPayment])
  upFrontPayments: UpFrontPayment[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class UpFrontPaymentPayload {
  @Field(type => UpFrontPayment)
  upFrontPayment: UpFrontPayment;

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type => Response, { nullable: true })
  response?: Response
}
