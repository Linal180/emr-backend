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


  /**
   * Finds by section id
   * @param sectionsId 
   * @returns by section id 
   */
  async findBySectionId(sectionsId: string): Promise<Questions[]> {
    return await this.questionRepo.find({ sectionsId })
  }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<Questions> {
    return await this.questionRepo.findOne(id)
  }

}