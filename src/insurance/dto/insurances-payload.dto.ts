import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { Insurance } from '../entities/insurance.entity';

@ObjectType()
export class Response {
  @Field(() => Int, { nullable: true })
  status: number

  @Field({ nullable: true })
  message: string
}

@ObjectType()
export class InsurancesPayload {
  @Field(() => [Insurance])
  insurances: Insurance[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}
