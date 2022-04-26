import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {

  @Field({ nullable: false })
  startAt: string;

  @Field({ nullable: false })
  endAt: string;

  @Field({ nullable: false })
  day: string;

  @Field({ nullable: true })
  recurringEndDate: Date;

  @Field({ nullable: true })
  doctorId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field(type => [String],{ nullable: false })
  servicesIds: string[];

}

// @InputType()
// export class CreateScheduleItemsInput {

//   @Field(type=> [CreateScheduleInput], { nullable: false })
//   createScheduleInput: CreateScheduleInput[]

// }