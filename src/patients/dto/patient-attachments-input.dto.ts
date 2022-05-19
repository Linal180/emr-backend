import { Field, InputType } from '@nestjs/graphql';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class PatientAttachmentsInput {
    @Field({ nullable: true })
    typeId?: string

    @Field({ nullable: true })
    searchString?: string

    @Field({ nullable: true })
    AttachmentModuleType?: AttachmentType

    @Field(type => PaginationInput)
    paginationOptions: PaginationInput
}