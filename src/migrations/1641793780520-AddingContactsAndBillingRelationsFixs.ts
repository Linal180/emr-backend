import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingContactsAndBillingRelationsFixs1641793780520 implements MigrationInterface {
    name = 'AddingContactsAndBillingRelationsFixs1641793780520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_b0c5e6ad09b56bea1589b647c16"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "doctorsId" TO "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_d45719329c31e52fe855cfaae89" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_d45719329c31e52fe855cfaae89"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "doctorId" TO "doctorsId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_fb77bdc73eeb6b69964bf4b7918" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_b0c5e6ad09b56bea1589b647c16" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
