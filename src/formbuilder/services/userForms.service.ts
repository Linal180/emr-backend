import { HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UserForms } from '../entities/userforms.entity'
import { CreateUserFormInput, UserFormInput } from "../dto/userForms.input";
import { UserFormElementService } from "./userFormElements.service";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { File } from 'src/aws/dto/file-input.dto';
import { AwsService } from 'src/aws/aws.service';
import { FormsService } from "./forms.service";


@Injectable()
export class UserFormsService {

  constructor(
    @InjectRepository(UserForms)
    private userFormsRepository: Repository<UserForms>,
    private readonly paginationService: PaginationService,
    private readonly userFormElementService: UserFormElementService,
    private readonly formService: FormsService,
    private readonly awsService: AwsService,
  ) { }


  async create(input: CreateUserFormInput): Promise<UserForms> {
    try {
      const userForm = this.userFormsRepository.create({ ...input });
      const userFormEles = input?.userFormElements?.map((ele) => ({ ...ele, UsersFormsId: input?.FormId }))
      const formElements = await this.formService.getForm(input?.FormId)
      const userFormElements = await this.userFormElementService.createBulk(userFormEles);
      userForm.userFormElements = userFormElements;
      userForm.form = formElements.form
      return await this.userFormsRepository.save(userForm)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async get() {

  }

  async findOne(id: string): Promise<UserForms> {
    return await this.userFormsRepository.findOne(id);
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

  async uploadUserFormMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<String> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.FORM_BUILDER;
      // const userForm = await this.findOne(updateAttachmentMediaInput.typeId)
      const attachment = await this.awsService.uploadFile(file, AttachmentType.FORM_BUILDER, updateAttachmentMediaInput.typeId);
      const { Key } = attachment || {};
      console.log('attachment', Key)
      if (Key) {
        return Key
      }
      throw new PreconditionFailedException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: 'Could not create or upload media',
      });
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}