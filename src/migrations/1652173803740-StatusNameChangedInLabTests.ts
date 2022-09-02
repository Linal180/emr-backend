import {MigrationInterface, QueryRunner} from "typeorm";

export class StatusNameChangedInLabTests1652173803740 implements MigrationInterface {
    name = 'StatusNameChangedInLabTests1652173803740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" RENAME COLUMN "status" TO "labTestStatus"`);
        await queryRunner.query(`ALTER TYPE "public"."LabTests_status_enum" RENAME TO "LabTests_labteststatus_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."LabTests_labteststatus_enum" RENAME TO "LabTests_status_enum"`);
        await queryRunner.query(`ALTER TABLE "LabTests" RENAME COLUMN "labTestStatus" TO "status"`);
    }

}
