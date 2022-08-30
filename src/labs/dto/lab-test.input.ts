
import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';
import { LabTestStatus } from '../entities/labTests.entity'

@InputType()
export default class LabTestInput {
  @Field({ nullable: true })
  patientId?: string

  @Field({ nullable: true })
  practiceId?: string

  @Field({ nullable: true })
  receivedDate?: string

  @Field({ nullable: true })
  orderNumber?: string

  @Field({ nullable: true, defaultValue: false })
  shouldFetchReceived?: boolean

  @Field({ nullable: true, defaultValue: false })
  shouldFetchPending?: boolean

  @Field({ nullable: true })
  labTestStatus?: LabTestStatus

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}