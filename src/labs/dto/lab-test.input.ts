
  import { Field, InputType } from '@nestjs/graphql';
  import PaginationInput from 'src/pagination/dto/pagination-input.dto';
  import {Status} from '../entities/labTests.entity' 
  
  @InputType()
  export default class LabTestInput {
      @Field({ nullable: true })
      patientId?: string

      @Field({ nullable: true })
      labTestStatus?: Status
  
      @Field(type => PaginationInput)
      paginationOptions: PaginationInput
  }