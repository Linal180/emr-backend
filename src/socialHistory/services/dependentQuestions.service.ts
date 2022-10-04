import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { DependentQuestions } from "../entities/dependentQuestions.entity";


@Injectable()
export class DependentQuestionService {
  constructor(
    @InjectRepository(DependentQuestions)
    private dependentQuestionRepo: Repository<DependentQuestions>,
  ) { }

  /**
   * Finds by qs id
   * @param questionsId 
   * @returns by qs id 
   */
  async findByQsId(questionsId: string): Promise<DependentQuestions[]> {
    return await this.dependentQuestionRepo.find({ questionsId })
  }

  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<DependentQuestions> {
    return await this.dependentQuestionRepo.findOne(id)
  }

}