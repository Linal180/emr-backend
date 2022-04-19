import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { UsersFormsElements } from '../entities/userFormElements.entity'
import { UserFormInput } from "../dto/userForms.input";
import { UserFormElementInputs } from "../dto/userFormElements.input";
import { UserForms } from "../entities/userforms.entity";

@Injectable()
export class UserFormElementService {

  constructor(
    @InjectRepository(UsersFormsElements)
    private userFormElementRepository: Repository<UsersFormsElements>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
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