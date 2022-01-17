import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientsAndFacility1642079843447 implements MigrationInterface {
    name = 'PatientsAndFacility1642079843447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD CONSTRAINT "FK_ab44def5ad019cc825036dcf8c8" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP CONSTRAINT "FK_ab44def5ad019cc825036dcf8c8"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "facilityId"`);
    }

}
