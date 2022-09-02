import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeIdInStaff1649763333861 implements MigrationInterface {
    name = 'PracticeIdInStaff1649763333861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "practiceId"`);
    }

}
