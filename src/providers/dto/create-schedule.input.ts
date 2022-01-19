import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateScheduleInput {

  @Field({ nullable: false })
  startAt: Date;

  @Field({ nullable: false })
  endAt: Date;

  @Field({ nullable: true })
  recurringEndDate: Date;

  @Field()
  doctorId: string;

}