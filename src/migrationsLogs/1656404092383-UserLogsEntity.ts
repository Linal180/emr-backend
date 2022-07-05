import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLogsEntity1656404092383 implements MigrationInterface {
    name = 'UserLogsEntity1656404092383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserLogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "operationName" character varying, "facilityId" character varying, "practiceId" character varying, "reqInfo" jsonb NOT NULL, "resInfo" jsonb NOT NULL, "ipAddress" character varying, "statusCode" character varying, "userId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7a2b0c06b977f47df844ab85cc2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "UserLogs"`);
    }

}
