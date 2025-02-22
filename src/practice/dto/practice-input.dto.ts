import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PracticeInput {

    @Field({ nullable: true })
    practiceName?: string
    
    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class GetAllPracticesInput {
    
}