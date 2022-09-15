import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
//entities
import { ICDCodes } from "../entities/icdcodes.entity";


@Injectable()
export class ICDCodeService {
  constructor(
    @InjectRepository(ICDCodes)
    private icdCodeRepo: Repository<ICDCodes>,
  ) { }


  /**
   * Finds one
   * @param id 
   * @returns one 
   */
  async findOne(id: string): Promise<ICDCodes> {
    return await this.icdCodeRepo.findOne(id)
  }

}