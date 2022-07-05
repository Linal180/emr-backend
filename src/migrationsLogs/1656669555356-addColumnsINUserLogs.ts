import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsINUserLogs1656669555356 implements MigrationInterface {
    name = 'addColumnsINUserLogs1656669555356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "statusCode"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "responseCode" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "moduleType" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "operationType" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "refererUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "patientId" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "activityPayload" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "activityPayload"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "refererUrl"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "operationType"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "moduleType"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "responseCode"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "statusCode" character varying`);
    }

}
