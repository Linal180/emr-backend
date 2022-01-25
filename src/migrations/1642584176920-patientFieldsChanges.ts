import {MigrationInterface, QueryRunner} from "typeorm";

export class patientFieldsChanges1642584176920 implements MigrationInterface {
    name = 'patientFieldsChanges1642584176920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "deseasedDate"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "relaseOfInfoBill"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "deceasedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "releaseOfInfoBill" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "releaseOfInfoBill"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "deceasedDate"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "relaseOfInfoBill" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "deseasedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
