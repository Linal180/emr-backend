import { Field, InputType } from '@nestjs/graphql';
import { CreateStaffItemInput } from './create-staff.inputItem';

@InputType()
export class CreateStaffInput {

  @Field({ nullable: false })
  staffInput: CreateStaffItemInput

  @Field(type =>[String], {nullable: true})
  providers?: string[]

}