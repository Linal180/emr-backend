import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class DocumentTypeInput {
    @Field({ nullable: true })
    documentPracticeId?: string

    @Field({ nullable: true })
    documentTypeName?: string

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}

@InputType()
export class CreateDocumentTypeInput {
    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    practiceId?: string;

}