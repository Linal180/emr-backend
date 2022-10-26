import { InputType, Field, PartialType, PickType } from '@nestjs/graphql';
import { SingleScheduleInput } from './create-schedule.input';

@InputType()
export class UpdateScheduleInput extends PartialType(SingleScheduleInput) {
  @Field()
  id: string;
}

@InputType()
export class GetSchedule extends PickType(UpdateScheduleInput, ['id'] as const) { }

@InputType()
export class GetDoctorSchedule {
  @Field()
  id: string
}

@InputType()
export class GetFacilitySchedule {
  @Field()
  id: string
}

@InputType()
export class GetSlots {

  @Field({ nullable: true })
  facilityId?: string

  @Field({ nullable: true })
  providerId?: string

  @Field({ nullable: true })
  day?: string

  @Field()
  offset: number

  @Field()
  serviceId: string

  @Field()
  currentDate: string

  @Field({ nullable: true })
  appointmentId?: string
}

@InputType()
export class GetSchedules extends PartialType(PickType(GetSlots, ['facilityId', 'providerId'] as const)) {

  @Field(() => [String], { nullable: true })
  days?: string[]

}

@InputType()
export class GetFacilitySlots extends PickType(UpdateScheduleInput, ['id'] as const) {
  @Field()
  offset: number

  @Field()
  serviceId: string

  @Field()
  currentDate: string
}

@InputType()
export class RemoveSchedule extends PickType(UpdateScheduleInput, ['id'] as const) { }
