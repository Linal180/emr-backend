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

  /**
   * Creates bulk
   * @param input 
   * @param userForm 
   * @returns bulk 
   */
  async createBulk(input: UserFormElementInputs[], userForm: UserForms): Promise<UsersFormsElements[]> {
    try {
      const userFormElements = this.userFormElementRepository.create(input);
      const newUserFormElements = userFormElements?.map((ele) => ({ ...ele, userForm }))
      return await this.userFormElementRepository.save(newUserFormElements)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  /**
   * Gets all user form elements
   * @param id 
   * @returns all user form elements 
   */
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

  async updateBulk(input: UserFormElementInputs[], userForm: UserForms): Promise<UsersFormsElements[]> {
    try {
      const { id: UsersFormsId } = userForm
      const values = await Promise.all(input?.map(async ({ FormsElementsId, arrayOfObjects, arrayOfStrings, value }) => {
        
        const element = await this.userFormElementRepository.findOne({ where: { UsersFormsId, FormsElementsId } })

        if(element){
          return {
            ...element,
            arrayOfObjects,
            arrayOfStrings,
            value,
          }
        }
        else{
          return {
            value,
            UsersFormsId,
            arrayOfObjects,
            arrayOfStrings,
            FormsElementsId
          }
        }
        
      }))

      const userFormElements = await this.userFormElementRepository.save(values)

      return userFormElements
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}