import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//data
import { QUESTION_ANSWERS, SECTIONS_QUESTIONS, TEMPLATE_NAMES, TEMPLATE_SECTIONS } from './seed-data'
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { SectionQuestions } from "../entities/sectionQuestions.entity";
import { QuestionAnswers } from "../entities/questionAnswers.entity";
import { TemplateSections } from "../entities/templateSections.entity";
import { QuestionAnswersType } from "src/lib/constants";

@Injectable()
export class CreateChartingTemplate implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const questionTemplateRepo = getRepository(QuestionTemplate)
      const sectionQuestionsRepo = getRepository(SectionQuestions)
      const questionAnswersRepo = getRepository(QuestionAnswers);
      const templateSectionsRepo = getRepository(TemplateSections);

      const createdTemplates = await Promise.all(TEMPLATE_NAMES.map(async (template) => {
        const { templateType, title } = template
        let templateInstance = await questionTemplateRepo.findOne({ where: { templateType, name: title } })
        if (!templateInstance) {
          const createdTemplate = questionTemplateRepo.create({ name: title, templateType })
          return await questionTemplateRepo.save(createdTemplate)
        }
        return templateInstance
      }))

      const transformedSectionData = TEMPLATE_SECTIONS.reduce((acc, templateSection) => {
        const { sections, templateName } = templateSection
        const transformedSections = sections.map((section) => {
          return {
            name: section,
            templateName
          }
        })

        acc.push(...transformedSections)
        return acc
      }, [])

      const createdSections = await Promise.all(transformedSectionData.map(async (section) => {
        const { name, templateName } = section

        const template = createdTemplates.find((templateInfo) => templateInfo.name === templateName)
        let sectionInstance = await templateSectionsRepo.findOne({ where: { name } })
        if (!sectionInstance) {
          const createdSection = templateSectionsRepo.create({ name })
          createdSection.template = template
          createdSection.templateId = template.id
          return await templateSectionsRepo.save(createdSection)
        }
        return sectionInstance
      }))

      const transformedQuestionsData = SECTIONS_QUESTIONS.reduce((acc, sectionQuestion) => {
        const { questions, sectionName } = sectionQuestion
        const transformedSections = questions.map((question) => {
          return {
            name: question,
            sectionName
          }
        })

        acc.push(...transformedSections)
        return acc
      }, [])

      const createdQuestions = await Promise.all(transformedQuestionsData.map(async (question) => {
        const { name, sectionName } = question

        const section = createdSections.find((sectionInfo) => sectionInfo.name === sectionName)
        let questionInstance = await sectionQuestionsRepo.findOne({ where: { title: name } })
        if (!questionInstance) {
          const createdQuestion = sectionQuestionsRepo.create({ title: name })
          createdQuestion.section = section
          createdQuestion.sectionId = section.id
          return await sectionQuestionsRepo.save(createdQuestion)
        }
        return questionInstance
      }))

      const transformedAnswersData = QUESTION_ANSWERS.reduce((acc, sectionQuestion) => {
        const { answers, questionTitle } = sectionQuestion
        const transformedAnswers = answers.map((answer) => {
          return {
            ...answer,
            questionTitle
          }
        })

        acc.push(...transformedAnswers)
        return acc
      }, [])

      const createdAnswers = await Promise.all(transformedAnswersData.map(async (answer) => {
        const { questionTitle, title, answerType, questionType, options } = answer

        const question = createdQuestions.find((sectionInfo) => sectionInfo.title === questionTitle)
        let answerInstance = await questionAnswersRepo.findOne({ where: { name: title } })
        if (!answerInstance) {
          const createdAnswer = questionAnswersRepo.create({ name: title, answerType, questionType, options })
          createdAnswer.questions = question
          createdAnswer.questionsId = question.id
          return await questionAnswersRepo.save(createdAnswer)
        }
        return answerInstance
      }))
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}