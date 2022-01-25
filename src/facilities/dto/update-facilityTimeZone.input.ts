import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFacilityTimeZoneInput {
  @Field()
  id: string

  @Field({nullable: true})
  timeZone: string
}