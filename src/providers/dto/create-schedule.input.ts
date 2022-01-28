import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class CreateScheduleInput {

  @Field({ nullable: false })
  startAt: Date;

  @Field({ nullable: false })
  endAt: Date;

  @Field({ nullable: true })
  recurringEndDate: Date;

  @Field({ nullable: false })
  doctorId: string;

  @Field({ nullable: false })
  locationId: string;

  @Field(type => [String],{ nullable: false })
  servicesIds: string[];

}