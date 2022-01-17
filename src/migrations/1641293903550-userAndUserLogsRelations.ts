import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndUserLogsRelations1641293903550 implements MigrationInterface {
    name = 'userAndUserLogsRelations1641293903550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD "assignedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD "removedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD CONSTRAINT "FK_309e3bf6cb6cdedd4969470b48c" FOREIGN KEY ("userIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD CONSTRAINT "FK_c1bc8651e708e092c3be5b5cf0b" FOREIGN KEY ("assignedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" ADD CONSTRAINT "FK_f440b75b6197a378cde0c5e8cd2" FOREIGN KEY ("removedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP CONSTRAINT "FK_f440b75b6197a378cde0c5e8cd2"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP CONSTRAINT "FK_c1bc8651e708e092c3be5b5cf0b"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP CONSTRAINT "FK_309e3bf6cb6cdedd4969470b48c"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP COLUMN "removedByIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP COLUMN "assignedByIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."UserLogs" DROP COLUMN "userIdId"`);
    }

}
