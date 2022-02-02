import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {

  @Field({ nullable: false })
  startAt: string;

  @Field({ nullable: false })
  endAt: string;

  @Field({ nullable: true })
  recurringEndDate: Date;

  @Field({ nullable: false })
  doctorId: string;

  @Field({ nullable: false })
  locationId: string;

  @Field(type => [String],{ nullable: false })
  servicesIds: string[];

}