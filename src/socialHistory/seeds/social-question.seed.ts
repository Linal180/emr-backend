import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
//entities
import { Sections } from "../entities/sections.entity";
import { Questions } from "../entities/questions.entity";
import { DependentQuestions } from "../entities/dependentQuestions.entity";
//data
import { SectionsData } from './seed-data'
import { SECTION_SPECIAL_TYPE, SocialDependentQuestions } from "src/lib/constants";

@Injectable()
export class CreateSocialQuestions implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const sectionsRepo = getRepository(Sections)
      const questionsRepo = getRepository(Questions)
      const dependentRepo = getRepository(DependentQuestions);

      const oldSection = await sectionsRepo.find({ specialId: SECTION_SPECIAL_TYPE });
      if (!oldSection.length) {
        //section data
        await Promise.all(SectionsData?.map(async (section) => {
          const { name, questions } = section;
          //create sections
          const sectionObj = sectionsRepo.create({ name, specialId: SECTION_SPECIAL_TYPE });
          const sectionInstance = await sectionsRepo.save(sectionObj)
          //create questions
          await Promise.all(questions?.map(async (question) => {
            const { dependentQuestions, ...rest } = question;
            //create question
            const questionObj = questionsRepo.create(rest);

            //associate section
            questionObj.sectionsId = sectionInstance.id
            questionObj.sections = sectionInstance;

            //save question
            const questionInstance = await questionsRepo.save(questionObj)

            //create dependent questions
            if (dependentQuestions?.length) {
              await Promise.all(dependentQuestions?.map(async (dependentQuestion) => {

                const input = dependentQuestion as SocialDependentQuestions || {}
                //create dependent question
                const dependent = dependentRepo.create(input);
                //associate questions
                dependent.parentId = questionInstance?.id;
                dependent.questionsId = questionInstance?.id
                dependent.questions = questionInstance;
                //save dependent questions
                return await dependentRepo.save(dependent)
              }));
            }
          }));
        }))
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}