import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityAndContactRelationss1641488702687 implements MigrationInterface {
    name = 'FacilityAndContactRelationss1641488702687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "facilityId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
