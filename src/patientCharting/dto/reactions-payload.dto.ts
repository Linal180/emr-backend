import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Reactions } from '../entities/reactions.entity';

@ObjectType()
export class ReactionsPayload extends ResponsePayloadResponse {
    @Field(type => [Reactions], { nullable: 'itemsAndList' })
    reactions: Reactions[];

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
