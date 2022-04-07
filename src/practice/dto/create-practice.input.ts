import { Field, InputType } from '@nestjs/graphql';
import { CreateFacilityItemInput } from 'src/facilities/dto/create-facilityItem.input ';
import { CreateContactInput } from 'src/providers/dto/create-contact.input';
import { RegisterUserInput } from 'src/users/dto/register-user-input.dto';
import { CreatePracticeItemInput } from './create-practiceItem.input';

@InputType()
export class CreatePracticeInput {

  @Field({nullable: true})
  createFacilityItemInput: CreateFacilityItemInput

  @Field({nullable: true})
  createFacilityContactInput?: CreateContactInput

  @Field({nullable: true}) 
  createContactInput?: CreateContactInput

  @Field({nullable: true})
  registerUserInput: RegisterUserInput

 @Field({nullable: true})
 createPracticeItemInput: CreatePracticeItemInput
}