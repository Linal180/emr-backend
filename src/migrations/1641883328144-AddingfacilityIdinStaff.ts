import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingfacilityIdinStaff1641883328144 implements MigrationInterface {
    name = 'AddingfacilityIdinStaff1641883328144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
