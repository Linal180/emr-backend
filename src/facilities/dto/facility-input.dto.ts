import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class FacilityInput {
    @Field({ nullable: true })
    isPrivate?: boolean

    @Field({ nullable: true })
    practiceId?: string

    @Field({ nullable: true })
    singleFacilityId?: string

    @Field({ nullable: true })
    facilityName?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}