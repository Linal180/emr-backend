import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPrimaryProvider1641883680017 implements MigrationInterface {
    name = 'AddingPrimaryProvider1641883680017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" ADD "primaryProvider" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" DROP COLUMN "primaryProvider"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
