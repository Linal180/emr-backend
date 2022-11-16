import { Field, Int, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { Practice } from '../entities/practice.entity';

@ObjectType()
export class PracticesPayload extends ResponsePayloadResponse {
    @Field(() => [Practice], { nullable: 'itemsAndList' })
    practices: Practice[];

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}

@ObjectType()
export class TotalPractices {

    @Field(() => Int, { nullable: true })
    total: number

    @Field(() => Int, { nullable: true })
    active: number

    @Field(() => Int, { nullable: true })
    inactive: number
}

@ObjectType()
export class PracticeCountPayload extends ResponsePayloadResponse {
    @Field(() => TotalPractices, { nullable: true })
    practices: TotalPractices

}
