
  import { Field, InputType } from '@nestjs/graphql';
  import PaginationInput from 'src/pagination/dto/pagination-input.dto';
  import {LabTestStatus} from '../entities/labTests.entity' 
  
  @InputType()
  export default class LabTestInput {
      @Field({ nullable: true })
      patientId?: string

      @Field({ nullable: true })
      labTestStatus?: LabTestStatus
  
      @Field(type => PaginationInput)
      paginationOptions: PaginationInput
  }