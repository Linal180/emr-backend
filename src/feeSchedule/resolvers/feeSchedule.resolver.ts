import { Resolver } from "@nestjs/graphql";
import { FeeSchedule } from "../entities/feeSchedule.entity";
import { FeeScheduleService } from "../services/feeSchedule.service";

@Resolver(() => FeeSchedule)
export class FeeScheduleResolver {
  constructor(private readonly feeScheduleService: FeeScheduleService){}
}