import { Field, ObjectType } from '@nestjs/graphql';
import PaginationPayload from 'src/pagination/dto/pagination-payload.dto';
import { ResponsePayload, ResponsePayloadResponse } from '../../users/dto/response-payload.dto';
import { SpecimenTypes } from '../entities/specimenTypes.entity';


@ObjectType()
export class TestSpecimenTypesPayload extends ResponsePayloadResponse {
    @Field(() => [SpecimenTypes], { nullable: true })
    specimenTypes: SpecimenTypes[];

    @Field({ nullable: true })
    response?: ResponsePayload

    @Field(() => PaginationPayload, { nullable: true })
    pagination?: PaginationPayload
}
