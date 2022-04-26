import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { UsersFormsElements } from '../entities/userFormElements.entity'
import { UserFormElementInputs } from "../dto/userFormElements.input";
import { UserForms } from "../entities/userforms.entity";

@Injectable()
export class UserFormElementService {

  constructor(
    @InjectRepository(UsersFormsElements)
    private userFormElementRepository: Repository<UsersFormsElements>,
  ) { }


  async createBulk(input: UserFormElementInputs[], userForm: UserForms): Promise<UsersFormsElements[]> {
    try {
      const userFormElements = this.userFormElementRepository.create(input);
      const newUserFormElements = userFormElements?.map((ele) => ({ ...ele, userForm }))
      return await this.userFormElementRepository.save(newUserFormElements)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllUserFormElements(id: string): Promise<UsersFormsElements[]> {
    try {
      return await this.userFormElementRepository.find({
        where: {
          UsersFormsId: id
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

  }

}