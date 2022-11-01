import { Field, InputType, PartialType, PickType } from "@nestjs/graphql";
//inputs
import PaginationInput from "src/pagination/dto/pagination-input.dto";
//entities
import { LabTestStatus } from "../entities/labTests.entity";

@InputType()
export class FindAllImagingOrderInput {

  @Field({ nullable: true })
  searchQuery: string

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput
}

@InputType()
export class CreateImagingOrderCodeInput {

  @Field(() => LabTestStatus)
  labTestStatus?: LabTestStatus

  @Field({ nullable: true })
  orderNumber?: string;

  @Field({ nullable: true })
  collectedDate?: string;

  @Field({ nullable: true })
  receivedDate?: string;

  @Field({ nullable: true })
  accessionNumber?: string;

  @Field({ nullable: true })
  labName?: string;

  @Field({ nullable: true })
  vendorName?: string;

  @Field({ nullable: true })
  testDate?: string;

  @Field({ nullable: true })
  testTime?: string;

  @Field({ nullable: true })
  testNotes?: string;

  @Field({ nullable: true })
  providerNotes?: string;

  @Field({ nullable: true })
  isSigned?: boolean;

  @Field({ nullable: true })
  patientId: string;

  @Field({ nullable: true })
  appointmentId?: string;

  @Field(() => [String], { nullable: true })
  imagingTests?: string[];


}

@InputType()
export class UpdateImagingOrderCodeInput extends PartialType(CreateImagingOrderCodeInput) {

  @Field()
  id: string;
}

@InputType()
export class GetImagingOrderCodeInput extends PickType(UpdateImagingOrderCodeInput, ['id'] as const) { }

@InputType()
export class RemoveImagingOrderCodeInput extends PickType(UpdateImagingOrderCodeInput, ['id'] as const) { }