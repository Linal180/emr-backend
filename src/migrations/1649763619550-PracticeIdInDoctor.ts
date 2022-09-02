import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeIdInDoctor1649763619550 implements MigrationInterface {
    name = 'PracticeIdInDoctor1649763619550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "practiceId"`);
    }

}
