import { Field, InputType } from '@nestjs/graphql';
import PaginationInput from 'src/pagination/dto/pagination-input.dto';

@InputType()
export default class LiveClaimFeedInput {
  @Field({ nullable: true })
  claimFeedFacilityName?: string

  @Field({ nullable: true })
  claimFeedPatientName?: string

  @Field({ nullable: true })
  claimFeedPayerId?: string

  @Field({ nullable: true })
  claimFeedFromDate?: string

  @Field({ nullable: true })
  claimFeedToDate?: string

  @Field(type => PaginationInput)
  paginationOptions: PaginationInput
}
