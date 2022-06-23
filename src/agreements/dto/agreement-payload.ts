import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from 'src/users/dto/response-payload.dto';
import { Agreement } from '../entities/agreement.entity';

@ObjectType()
export class AgreementsPayload extends ResponsePayloadResponse {
  @Field(type => [Agreement])
  agreements: Agreement[];

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field({ nullable: true })
  response?: ResponsePayload
}

@ObjectType()
export class AgreementPayload extends ResponsePayloadResponse {
  @Field(type => Agreement)
  agreement: Agreement;

  @Field(type => PaginationPayload, { nullable: true })
  pagination?: PaginationPayload

  @Field({ nullable: true })
  response?: ResponsePayload
}
