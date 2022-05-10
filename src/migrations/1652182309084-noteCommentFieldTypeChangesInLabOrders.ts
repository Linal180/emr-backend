import {MigrationInterface, QueryRunner} from "typeorm";

export class noteCommentFieldTypeChangesInLabOrders1652182309084 implements MigrationInterface {
    name = 'noteCommentFieldTypeChangesInLabOrders1652182309084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "comments" text`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "note" text`);
        await queryRunner.query(`ALTER TABLE "Observations" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Observations" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" DROP COLUMN "specimenNotes"`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" ADD "specimenNotes" text`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testNotes"`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "testNotes" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testNotes"`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "testNotes" character varying`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" DROP COLUMN "specimenNotes"`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" ADD "specimenNotes" character varying`);
        await queryRunner.query(`ALTER TABLE "Observations" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Observations" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "note" character varying DEFAULT 'text'`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "comments" character varying DEFAULT 'text'`);
    }

}
