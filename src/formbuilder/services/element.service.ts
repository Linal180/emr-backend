import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { Element } from '../entities/element.entity';
import { ElementInputs } from "../dto/element.input";
//service
@Injectable()
export class ElementService {

  constructor(@InjectRepository(Element) private elementRepository: Repository<Element>) { }

  /**
   * Creates element service
   * @param inputs 
   * @returns  
   */
  async create(inputs: ElementInputs) {
    try {
      const element = this.elementRepository.create(inputs);
      return await this.elementRepository.save(element)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Gets by type
   * @param type 
   * @returns  
   */
  async getByType(type: ElementInputs) {
    try {
      return await this.elementRepository.findOneOrFail({
        where: {
          type: type.type
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}