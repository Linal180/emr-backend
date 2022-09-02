import { Field, Int, ObjectType } from '@nestjs/graphql';
//payloads
import { Response } from 'src/insurance/dto/insurances-payload.dto';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
//entities
import { ClaimStatus } from '../entities/claim-status.entity';

@ObjectType()
export class ClaimStatusesPayload {
  @Field(() => [ClaimStatus])
  claimStatuses: ClaimStatus[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(() => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class ClaimStatusPayload {
  @Field(() => ClaimStatus)
  claimStatus: ClaimStatus;

  @Field(() => Response, { nullable: true })
  response?: Response
}
