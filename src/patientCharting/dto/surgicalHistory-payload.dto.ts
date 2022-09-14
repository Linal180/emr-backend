import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { SurgicalHistory } from '../entities/surgicalHistory.entity';

@ObjectType()
export class SurgicalHistoryPayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    surgicalHistory: SurgicalHistory;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class SurgicalHistoriesPayload extends ResponsePayloadResponse {
    @Field(() => [SurgicalHistory], { nullable: true })
    surgicalHistories: SurgicalHistory[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
