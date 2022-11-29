import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { TemplateType } from "src/lib/constants";
import { Connection, getRepository } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Exercises } from "../entities/physicalTherapyExercise.entity";
import { QuestionTemplate } from "../entities/questionTemplate.entity";

import { exercisesData } from './exercise-data'


@Injectable()
export class CreateExerciseTemplate implements Seeder {
    public async run(_: Factory, connection: Connection): Promise<void> {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            const templateRepo = getRepository(QuestionTemplate)
            const exerciseRepo = getRepository(Exercises)

            for (let index = 0; index < exercisesData.length; index++) {
                const element = exercisesData[index];
                const { name, exercises } = element;
                const oldTemplate = await templateRepo.findOne({ name, templateType: TemplateType.PHYSICAL_EXERCISE });
                if (!oldTemplate) {
                    const chartingTemplate = templateRepo.create({ name, templateType: TemplateType.PHYSICAL_EXERCISE });
                    const templateInstance = await templateRepo.save(chartingTemplate);

                    await Promise.all(exercises?.map(async (exercise) => {
                        const { name } = exercise;
                        const exerciseInstance = exerciseRepo.create({ name });
                        exerciseInstance.templateId = templateInstance?.id;
                        exerciseInstance.template = templateInstance
                        return await exerciseRepo.save(exerciseInstance)
                    }))
                }
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