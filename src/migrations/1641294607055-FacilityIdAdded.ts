import { MigrationInterface, QueryRunner } from "typeorm";

export class FacilityIdAdded1641294607055 implements MigrationInterface {
    name = 'FacilityIdAdded1641294607055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."UserLogs_action_enum" AS ENUM('added', 'edited', 'deleted')`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD "action" "public"."UserLogs_action_enum" NOT NULL DEFAULT 'added'`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD "facilityId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "facilityId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ALTER COLUMN "entityName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ALTER COLUMN "entityName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP COLUMN "action"`);
        await queryRunner.query(`DROP TYPE "public"."UserLogs_action_enum"`);
    }

}
