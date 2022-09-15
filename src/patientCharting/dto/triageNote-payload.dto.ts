import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { TriageNotes } from '../entities/triageNotes.entity';

@ObjectType()
export class TriageNotePayload extends ResponsePayloadResponse {
    @Field({ nullable: true })
    triageNotes: TriageNotes;

    @Field({ nullable: true })
    response?: ResponsePayload
}

@ObjectType()
export class TriageNotesPayload extends ResponsePayloadResponse {
    @Field(() => [TriageNotes], { nullable: true })
    triageNotes: TriageNotes[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(type => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
