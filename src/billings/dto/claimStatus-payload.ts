import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/insurance/dto/insurances-payload.dto';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ClaimStatus } from '../entities/claim-status.entity';

@ObjectType()
export class ClaimStatusesPayload {
  @Field(type => [ClaimStatus])
  claimStatuses: ClaimStatus[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field(type => Response, { nullable: true })
  response?: Response
}

@ObjectType()
export class ClaimStatusPayload {
  @Field(type => ClaimStatus)
  claimStatus: ClaimStatus;

  @Field(type => Response, { nullable: true })
  response?: Response
}
