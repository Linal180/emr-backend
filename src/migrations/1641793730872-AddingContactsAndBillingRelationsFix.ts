import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingContactsAndBillingRelationsFix1641793730872 implements MigrationInterface {
    name = 'AddingContactsAndBillingRelationsFix1641793730872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_696794e748c8a236ee16ace13a0"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" RENAME COLUMN "doctorsId" TO "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" RENAME COLUMN "doctorId" TO "doctorsId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_696794e748c8a236ee16ace13a0" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
