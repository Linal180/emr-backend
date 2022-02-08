import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';
import { CreateScheduleInput } from './create-schedule.input';

@InputType()
export class UpdateScheduleInput extends PartialType(CreateScheduleInput) {
  @Field()
  id: string;
}

@InputType()
export class GetSchedule extends PickType(UpdateScheduleInput, ['id'] as const) { }

@InputType()
export class GetDoctorSchedule extends PickType(UpdateScheduleInput, ['id'] as const) {
  @Field()
  offset: number

  @Field()
  serviceId: string

  @Field()
  currentDate: string
 }

@InputType()
export class RemoveSchedule extends PickType(UpdateScheduleInput, ['id'] as const) { }
