import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {

  @Field()
  startAt: Date;

  @Field()
  endAt: Date;

  @Field()
  recurringEndDate: Date;

  @Field()
  doctorId: string;

}