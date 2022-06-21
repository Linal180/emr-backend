import { Field, InputType, PartialType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export class AgreementInput {
  @Field({ nullable: true })
  title: string

  @Field({ nullable: true })
  body: string

  @Field({ nullable: true })
  viewAgreementBeforeAgreeing: boolean;

  @Field({ nullable: true })
  signatureRequired: boolean;
}

@InputType()
export class AgreementPaginationInput {
  @Field({ nullable: true })
  searchString: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class UpdateAgreementInput extends PartialType(AgreementInput) {
   @Field()
   id: string
}
