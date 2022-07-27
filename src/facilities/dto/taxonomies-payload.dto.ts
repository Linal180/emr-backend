import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Taxonomy } from '../entities/taxonomy.entity';

@ObjectType()
export class TaxonomyPayload extends ResponsePayloadResponse {
  @Field(() => [Taxonomy], { nullable: true })
  taxonomies: Taxonomy[];

  @Field(() => PaginationPayload, { nullable: true })
  pagination: PaginationPayload

  @Field({ nullable: true })
  response?: ResponsePayload
}
