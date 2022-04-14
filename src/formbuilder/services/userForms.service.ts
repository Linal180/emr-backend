import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { UserForms } from '../entities/userforms.entity'
import { CreateUserFormInput, UserFormInput } from "../dto/userForms.input";
import { UserFormElementService } from "./userFormElements.service";

@Injectable()
export class UserFormsService {

  constructor(
    @InjectRepository(UserForms)
    private userFormsRepository: Repository<UserForms>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly userFormElementService: UserFormElementService
  ) { }


  async create(input: CreateUserFormInput): Promise<UserForms> {
    try {
      const userForm = this.userFormsRepository.create({ ...input });
      const userFormEles = input?.userFormElements?.map((ele) => ({ ...ele, UsersFormsId: input?.FormId }))
      const userFormElements = await this.userFormElementService.createBulk(userFormEles);
      console.log('userFormElements => ', userFormElements)
      userForm.userFormElements = userFormElements;
      return await this.userFormsRepository.save(userForm)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get() {

  }

  async getAll(input: UserFormInput) {
    try {
      const paginationResponse = await this.paginationService.willPaginate<UserForms>(this.userFormsRepository, input)
      return {
        pagination: {
          ...paginationResponse
        },
        userForms: paginationResponse.data,
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}