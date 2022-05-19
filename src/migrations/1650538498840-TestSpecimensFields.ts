import {MigrationInterface, QueryRunner} from "typeorm";

export class TestSpecimensFields1650538498840 implements MigrationInterface {
    name = 'TestSpecimensFields1650538498840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."LabTests_status_enum" AS ENUM('Order Entered', 'Discontinued', 'In Progress', 'Results Received', 'Results Reviewed with Patient')`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "status" "public"."LabTests_status_enum" NOT NULL DEFAULT 'Order Entered'`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "testDate" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "testTime" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "testNotes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testNotes"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testTime"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testDate"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."LabTests_status_enum"`);
    }

}
