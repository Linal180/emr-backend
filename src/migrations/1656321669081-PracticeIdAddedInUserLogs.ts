import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeIdAddedInUserLogs1656321669081 implements MigrationInterface {
    name = 'PracticeIdAddedInUserLogs1656321669081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "practiceId"`);
    }

}
