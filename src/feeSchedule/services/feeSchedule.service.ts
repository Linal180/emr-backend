import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { FeeSchedule } from "../entities/feeSchedule.entity";

@Injectable()
export class FeeScheduleService {
  constructor(
    @InjectRepository(FeeSchedule)
    private feeScheduleRepository: Repository<FeeSchedule>) { }

    async create() {
      
    }

}