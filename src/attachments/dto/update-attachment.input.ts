import { Field, InputType, PartialType, PickType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { Patient } from 'src/patients/entities/patient.entity';
import { Attachment } from '../entities/attachment.entity';
import { CreateAttachmentInput } from './create-attachment.input';

@InputType()
export class UpdateAttachmentInput extends PartialType(CreateAttachmentInput) {
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class UpdateAttachmentMediaInput extends PickType(CreateAttachmentInput, ['type', 'typeId'] as const) {
  @Field({ nullable: true })
  id?: string;
}

@InputType()
export class GetAttachment {
  @Field()
  typeId: string;
}

@InputType()
export class GetAttachmentsByLabOrder {
  @Field()
  typeId: string;

  @Field()
  orderNum: string;
}


@InputType()
export class GetMedia extends PickType(UpdateAttachmentInput, ['id'] as const) {
}

@InputType()
export default class AttachmentInput {

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput

}

@InputType()
export class RemoveAttachment extends PickType(UpdateAttachmentInput, ['id'] as const) {

}

@InputType()
export class PatientAttachmentsPayload extends PartialType(Patient) {
  @Field(type => [Attachment], { nullable: 'itemsAndList' })
  attachments?: Attachment[];
}
