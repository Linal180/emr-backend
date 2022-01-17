import { MigrationInterface, QueryRunner } from "typeorm";

export class StaffVsFacility1641381900779 implements MigrationInterface {
    name = 'StaffVsFacility1641381900779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Staff" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" ADD CONSTRAINT "FK_9239859c05d0eda2a1f1588baaa" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Staff" DROP CONSTRAINT "FK_9239859c05d0eda2a1f1588baaa"`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" DROP COLUMN "facilityId"`);
    }

}
