import { Field, InputType, registerEnumType } from "@nestjs/graphql";
//user imports
import PaginationInput from "src/pagination/dto/pagination-input.dto";


//enums

export enum PracticeRolesTypes {
  DOCTOR = 'doctor',
  PATIENT = 'patient'
}

registerEnumType(PracticeRolesTypes, {
  name: "PracticeRolesTypes",
  description: "The type is assigned",
});

@InputType()
export class PracticeFacilitiesInputs {

  @Field(() => PaginationInput)
  paginationOptions: PaginationInput

}


@InputType()
export class PracticeFacilitiesUsersInputs {

  @Field(() => [PracticeRolesTypes], { nullable: true })
  roles?: PracticeRolesTypes[]

  @Field({ nullable: true })
  practiceId?: string

}

@InputType()
export class PracticesViaDateInputs {

  @Field(() => Number, { nullable: false })
  date: number

}


@InputType()
export class PracticeFacilityAppointmentsInputs {

  @Field({ nullable: true })
  practiceId?: string
  
}


@InputType()
export class UsersWithRolesInputs {

  @Field({ nullable: true })
  practiceId?: string
  
}


