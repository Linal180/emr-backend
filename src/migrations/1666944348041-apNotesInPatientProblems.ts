import {MigrationInterface, QueryRunner} from "typeorm";

export class apNotesInPatientProblems1666944348041 implements MigrationInterface {
    name = 'apNotesInPatientProblems1666944348041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "apNotes" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "apNotes"`);
    }

}
