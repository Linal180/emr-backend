import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus, Injectable, InternalServerErrorException, PreconditionFailedException } from "@nestjs/common";
//entities
import { QuestionTemplate } from "../entities/questionTemplate.entity";
//inputs
import { FindAllTemplatesInput } from "../dto/questionTemplate-input.dto";
//payloads
import { FindAllQuestionTemplatesPayload, QuestionTemplatePayload } from "../dto/questionTemplate-payload.dto";
//service
import { QuestionAnswersService } from "./questionAnswers.service";
import { TemplateSectionsService } from "./templateSections.service";
import { SectionQuestionsService } from "./sectionQuestions.service";
import { PaginationService } from "src/pagination/pagination.service";
import { AttachmentsService } from "src/attachments/services/attachments.service";
//constants
import { CreateTemplateType } from "src/lib/constants";
import { AttachmentType } from "src/attachments/entities/attachment.entity";
import { UpdateAttachmentMediaInput } from "src/attachments/dto/update-attachment.input";
import { File } from "src/aws/dto/file-input.dto";


@Injectable()
export class ChartingTemplateService {
  constructor(
    @InjectRepository(QuestionTemplate)
    private questionTemplateRepository: Repository<QuestionTemplate>,
    private readonly paginationService: PaginationService,
    private readonly templateSectionsService: TemplateSectionsService,
    private readonly sectionQuestionsService: SectionQuestionsService,
    private readonly questionAnswersService: QuestionAnswersService,
    private readonly attachmentsService: AttachmentsService
  ) { }

  /**
   * Fetchs all
   * @param params 
   * @returns all 
   */
  async fetchAll(params: FindAllTemplatesInput): Promise<FindAllQuestionTemplatesPayload> {
    try {
      const { paginationOptions, searchString } = params
      const response = await this.paginationService.willPaginate<QuestionTemplate>(this.questionTemplateRepository, { ...params, associatedTo: 'QuestionTemplate', associatedToField: { columnValue: searchString, columnName: 'name', filterType: 'stringFilter' } });
      const { data: templates, ...pagination } = response
      return { templates, pagination }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(templateId: string): Promise<QuestionTemplatePayload> {
    try {
      const template = await this.questionTemplateRepository.findOne({ where: { id: templateId } })
      return { template }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Creates charting template service
   * @param templateData 
   * @returns create 
   */
  async create(templateData: CreateTemplateType): Promise<QuestionTemplatePayload> {
    try {
      const { templateName, sections, templateType } = templateData
      if (!templateName) {
        throw new Error("Must provide a valid templateName of template")
      }
      const alreadyExistTemplate = await this.questionTemplateRepository.findOne({ templateType, name: templateName })
      if (alreadyExistTemplate) {
        throw new Error("Template Already Exists")
      }
      const templateIns = this.questionTemplateRepository.create({ templateType, name: templateName, specialId: templateName })
      const templateInstance = await this.questionTemplateRepository.save(templateIns)

      if (sections) {
        for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
          const section = sections[sectionIndex];
          const { title, questions } = section;

          const sectionInstance = await this.templateSectionsService.create({ name: title, specialId: `${templateName}_${sectionIndex}`, template: templateInstance })

          for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
            const question = questions[questionIndex];
            const { title, answers } = question;

            const questionInstance = await this.sectionQuestionsService.create({
              name: title, specialId: `${templateName}_${sectionIndex}_${questionIndex}`, section: sectionInstance
            })

            for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
              const answer = answers[answerIndex];
              const { title, answerType, values } = answer

              const answersInstance = this.questionAnswersService.create({
                answerType, question: questionInstance, specialId: `${templateName}_${sectionIndex}_${questionIndex}_${answerIndex}`, title, options: values
              })
            }
          }
        }
      }

      return {
        template: templateInstance
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Finds templates
   * @param searchString 
   * @returns templates 
   */
  async findTemplates(searchString: string): Promise<QuestionTemplate[]> {
    try {
      const templates = await this.questionTemplateRepository.find({
        where: {
          name: ILike(`%${searchString}%`)
        }
      })

      return templates
    } catch (error) { }
  }

  async uploadChartingMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<QuestionTemplate> {
    try {
      const attachment = await this.attachmentsService.uploadPublicAttachment(file, updateAttachmentMediaInput)
      const { template } = await this.findOne(updateAttachmentMediaInput.typeId)
      if (attachment) {
        return template;
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

  async removePatientMedia(id: string) {
    try {
      return await this.attachmentsService.removeMedia(id)
    }
    catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  // async updatePatientMedia(file: File, updateAttachmentMediaInput: UpdateAttachmentMediaInput): Promise<QuestionTemplate> {
  //   try {
  //     updateAttachmentMediaInput.type = AttachmentType.PATIENT
  //     const attachment = await this.attachmentsService.updateAttachment(file, updateAttachmentMediaInput)
  //     const template = await this.questionTemplateRepository.findOne(updateAttachmentMediaInput.typeId)
  //     if (attachment) {
  //       return { template }
  //     }
  //     throw new PreconditionFailedException({
  //       status: HttpStatus.PRECONDITION_FAILED,
  //       error: 'Could not create or upload media',
  //     });
  //   }
  //   catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }


  // async getPatientMedia(id: string) {
  //   try {
  //     return await this.attachmentsService.getMedia(id)
  //   }
  //   catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}