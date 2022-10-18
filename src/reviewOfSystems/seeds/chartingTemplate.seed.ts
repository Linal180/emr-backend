import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getRepository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
//data
import { TEMPLATE_DATA } from './seed-data'
//entities
import { QuestionAnswers } from "../entities/questionAnswers.entity";
import { QuestionTemplate } from "../entities/questionTemplate.entity";
import { SectionQuestions } from "../entities/sectionQuestions.entity";
import { TemplateSections } from "../entities/templateSections.entity";

@Injectable()
export class CreateChartingTemplate implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    // const queryRunner = connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    try {

      const templateRepo = getRepository(QuestionTemplate)
      const sectionsRepo = getRepository(TemplateSections);
      const questionsRepo = getRepository(SectionQuestions)
      const answersRepo = getRepository(QuestionAnswers);

      //template data

      const oldTemplates = await templateRepo.find();
      if (!oldTemplates?.length) {

        for (let templateIndex = 0; templateIndex < TEMPLATE_DATA.length; templateIndex++) {
          const template = TEMPLATE_DATA[templateIndex];

          const { templateType, title, sections } = template;
          const templateIns = templateRepo.create({ templateType, name: title, specialId: `${templateIndex}` })
          const templateInstance = await templateRepo.save(templateIns)

          for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
            const section = sections[sectionIndex];
            const { name, questions } = section;

            const sectionIns = sectionsRepo.create({ name, specialId: `${templateIndex}_${sectionIndex}` });
            sectionIns.template = templateInstance
            sectionIns.templateId = templateInstance?.id
            const sectionInstance = await sectionsRepo.save(sectionIns)

            for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
              const question = questions[questionIndex];
              const { name, answers } = question;

              const questionIns = questionsRepo.create({ title: name, specialId: `${templateIndex}_${sectionIndex}_${questionIndex}` })
              questionIns.section = sectionInstance
              questionIns.sectionId = sectionInstance?.id
              const questionInstance = await questionsRepo.save(questionIns)

              for (let answerIndex = 0; answerIndex < answers.length; answerIndex++) {
                const answer = answers[answerIndex];

                const answerIns = answersRepo.create({ ...answer, specialId: `${templateIndex}_${sectionIndex}_${questionIndex}_${answerIndex}` })
                answerIns.questions = questionInstance
                answerIns.questionsId = questionInstance?.id
                await answersRepo.save(answerIns)
              }
            }
          }
        }
      }

      // await queryRunner.commitTransaction();
    } catch (error) {
      // await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      // await queryRunner.release();
    }
  }
}