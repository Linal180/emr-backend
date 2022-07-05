import {MigrationInterface, QueryRunner} from "typeorm";

export class UserAndUserLogsRelation1656321472624 implements MigrationInterface {
    name = 'UserAndUserLogsRelation1656321472624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP CONSTRAINT "FK_f440b75b6197a378cde0c5e8cd2"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP CONSTRAINT "FK_c1bc8651e708e092c3be5b5cf0b"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP CONSTRAINT "FK_309e3bf6cb6cdedd4969470b48c"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "assignedByIdId"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "removedByIdId"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "action"`);
        await queryRunner.query(`DROP TYPE "public"."UserLogs_action_enum"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "entityName"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "operationName" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD CONSTRAINT "FK_743c82576fdaa3de075d3e10bb0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP CONSTRAINT "FK_743c82576fdaa3de075d3e10bb0"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "operationName"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "entityName" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."UserLogs_action_enum" AS ENUM('added', 'deleted', 'edited')`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "action" "public"."UserLogs_action_enum" NOT NULL DEFAULT 'added'`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "removedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "assignedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD CONSTRAINT "FK_309e3bf6cb6cdedd4969470b48c" FOREIGN KEY ("userIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD CONSTRAINT "FK_c1bc8651e708e092c3be5b5cf0b" FOREIGN KEY ("assignedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD CONSTRAINT "FK_f440b75b6197a378cde0c5e8cd2" FOREIGN KEY ("removedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
