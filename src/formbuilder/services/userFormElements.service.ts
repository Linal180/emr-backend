import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { UsersFormsElements } from '../entities/userFormElements.entity'
import { UserFormInput } from "../dto/userForms.input";
import { UserFormElementInputs } from "../dto/userFormElements.input";

@Injectable()
export class UserFormElementService {

  constructor(
    @InjectRepository(UsersFormsElements)
    private userFormElementRepository: Repository<UsersFormsElements>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
  ) { }


  async createBulk(input: UserFormElementInputs[]): Promise<UsersFormsElements[]> {
    try {
      const userForm = this.userFormElementRepository.create(input);
      return await this.userFormElementRepository.save(userForm)
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