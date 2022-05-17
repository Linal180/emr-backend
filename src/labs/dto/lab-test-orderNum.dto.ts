import { Field, InputType } from "@nestjs/graphql"
import PaginationInput from "src/pagination/dto/pagination-input.dto"
import { LabTestStatus } from "../entities/labTests.entity"

@InputType()
  export default class LabTestByOrderNumInput {
      @Field({ nullable: true })
      patientId?: string

      @Field({ nullable: true })
      orderNumber?: string

      @Field({ nullable: true })
      labTestStatus?: LabTestStatus
  
      @Field(type => PaginationInput, { nullable: true })
      paginationOptions?: PaginationInput
  }