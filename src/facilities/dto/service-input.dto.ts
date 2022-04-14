import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class ServiceInput {

    @Field({ nullable: true })
    facilityId?: string

    @Field({ nullable: true })
    serviceName?: string

    @Field({ nullable: true})
    isActive?: boolean

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}