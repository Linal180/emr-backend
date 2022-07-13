import {MigrationInterface, QueryRunner} from "typeorm";

export class billingsAndFacilityRelationship1657704142821 implements MigrationInterface {
    name = 'billingsAndFacilityRelationship1657704142821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "claimNo" character varying`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "serviceDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "claimDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "pos" character varying`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_e57f1a683d1debdbbb3a8a99027" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_e57f1a683d1debdbbb3a8a99027"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "pos"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "claimDate"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "serviceDate"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "claimNo"`);
    }

}
