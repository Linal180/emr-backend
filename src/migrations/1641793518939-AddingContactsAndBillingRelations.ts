import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingContactsAndBillingRelations1641793518939 implements MigrationInterface {
    name = 'AddingContactsAndBillingRelations1641793518939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "doctorsId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD "doctorsId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_b0c5e6ad09b56bea1589b647c16" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_696794e748c8a236ee16ace13a0" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_696794e748c8a236ee16ace13a0"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_b0c5e6ad09b56bea1589b647c16"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP COLUMN "doctorsId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "doctorsId"`);
    }

}
