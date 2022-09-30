import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { Questions } from "../entities/questions.entity";


@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions)
    private questionRepo: Repository<Questions>,
  ) { }


  async findBySectionId(sectionsId: string): Promise<Questions[]> {
    return await this.questionRepo.find({ sectionsId })
  }

}