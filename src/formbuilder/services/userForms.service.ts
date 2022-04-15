import { HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
//user import
import { PaginationService } from "src/pagination/pagination.service";
import { UtilsService } from "src/util/utils.service";
import { UserForms } from '../entities/userforms.entity'
import { CreateUserFormInput, UserFormInput } from "../dto/userForms.input";
import { UserFormElementService } from "./userFormElements.service";
import { Attachment, AttachmentType } from "src/attachments/entities/attachment.entity";
import { AttachmentsService } from "src/attachments/attachments.service";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { File } from 'src/aws/dto/file-input.dto';


@Injectable()
export class UserFormsService {

  constructor(
    @InjectRepository(UserForms)
    private userFormsRepository: Repository<UserForms>,
    private readonly paginationService: PaginationService,
    private readonly utilsService: UtilsService,
    private readonly userFormElementService: UserFormElementService,
    private readonly attachmentsService: AttachmentsService
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

  async uploadUserFormMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<Attachment> {
    try {
      updateAttachmentMediaInput.type = AttachmentType.FORM_BUILDER;
      const attachment = await this.attachmentsService.uploadAttachment(file, updateAttachmentMediaInput)
      // const userForm = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return attachment
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