import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { SocialHistory } from "../entities/socialHistory.entity";


@Injectable()
export class SocialHistoryService {
  constructor(
    @InjectRepository(SocialHistory)
    private socialHistoryRepo: Repository<SocialHistory>,
  ) { }


}