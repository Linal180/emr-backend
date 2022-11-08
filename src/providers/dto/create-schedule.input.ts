import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SingleScheduleInput {

  @Field({ nullable: false })
  startAt: string;

  @Field({ nullable: false })
  endAt: string;

  @Field({ nullable: false })
  day: string;

  @Field({ nullable: true })
  recurringEndDate: string;

  @Field({ nullable: true })
  doctorId: string;

  @Field({ nullable: true })
  facilityId: string;

  @Field(() => [String], { nullable: false })
  servicesIds: string[];

}

@InputType()
export class CreateScheduleInput {

  @Field(() => [SingleScheduleInput], { nullable: false })
  schedules: SingleScheduleInput[]

}

@InputType()
export class UpdateBulkScheduleInput extends CreateScheduleInput { }

// @InputType()
// export class CreateScheduleItemsInput {

//   @Field(type=> [CreateScheduleInput], { nullable: false })
//   createScheduleInput: CreateScheduleInput[]

// }