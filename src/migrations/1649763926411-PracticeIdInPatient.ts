import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeIdInPatient1649763926411 implements MigrationInterface {
    name = 'PracticeIdInPatient1649763926411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "practiceId"`);
    }

}
