import { Field, InputType } from "@nestjs/graphql";
//user imports
import PaginationInput from "src/pagination/dto/pagination-input.dto";

@InputType()
export class PracticeFacilitiesInputs {

	@Field(() => PaginationInput)
	paginationOptions: PaginationInput

}

@InputType()
export class PracticeUsersInputs {

	@Field(() => PaginationInput)
	paginationOptions: PaginationInput
}

@InputType()
export class PracticesViaDateInputs {
	
	@Field(() => Number, { nullable: false })
	date: number
}