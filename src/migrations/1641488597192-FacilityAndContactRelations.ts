import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityAndContactRelations1641488597192 implements MigrationInterface {
    name = 'FacilityAndContactRelations1641488597192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "contactId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD CONSTRAINT "FK_7bb5b1ab3479cfae5d8ea42ee1d" FOREIGN KEY ("contactId") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP CONSTRAINT "FK_7bb5b1ab3479cfae5d8ea42ee1d"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "contactId"`);
    }

}
