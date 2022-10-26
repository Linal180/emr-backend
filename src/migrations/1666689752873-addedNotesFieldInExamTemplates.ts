import {MigrationInterface, QueryRunner} from "typeorm";

export class addedNotesFieldInExamTemplates1666689752873 implements MigrationInterface {
    name = 'addedNotesFieldInExamTemplates1666689752873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD "notes" jsonb`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" ADD "notes" jsonb`);
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" ADD "notes" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP COLUMN "notes"`);
    }

}
