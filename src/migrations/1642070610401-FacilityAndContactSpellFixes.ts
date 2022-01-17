import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityAndContactSpellFixes1642070610401 implements MigrationInterface {
    name = 'FacilityAndContactSpellFixes1642070610401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_81a0957e351b1c76c51bd23c190"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_556dbe6ca4399c0f4a13c1b7265"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "facilitiyId" TO "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" RENAME COLUMN "faciltiyId" TO "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_eb7b46eb7860fa19897d7a9d171" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" DROP CONSTRAINT "FK_eb7b46eb7860fa19897d7a9d171"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" RENAME COLUMN "facilityId" TO "faciltiyId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "facilityId" TO "facilitiyId"`);
        await queryRunner.query(`ALTER TABLE "public"."BillingAddresses" ADD CONSTRAINT "FK_556dbe6ca4399c0f4a13c1b7265" FOREIGN KEY ("faciltiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_81a0957e351b1c76c51bd23c190" FOREIGN KEY ("facilitiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
