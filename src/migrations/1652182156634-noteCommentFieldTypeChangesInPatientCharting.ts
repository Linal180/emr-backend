import {MigrationInterface, QueryRunner} from "typeorm";

export class noteCommentFieldTypeChangesInPatientCharting1652182156634 implements MigrationInterface {
    name = 'noteCommentFieldTypeChangesInPatientCharting1652182156634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ALTER COLUMN "comments" SET DEFAULT 'text'`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ALTER COLUMN "note" SET DEFAULT 'text'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ALTER COLUMN "note" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ALTER COLUMN "comments" DROP DEFAULT`);
    }

}
