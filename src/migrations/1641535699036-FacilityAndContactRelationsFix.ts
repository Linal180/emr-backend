import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityAndContactRelationsFix1641535699036 implements MigrationInterface {
    name = 'FacilityAndContactRelationsFix1641535699036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP CONSTRAINT "FK_7bb5b1ab3479cfae5d8ea42ee1d"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "contactId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "faciltiyId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_ee343d32225a3cf90fd66392d00" FOREIGN KEY ("faciltiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_ee343d32225a3cf90fd66392d00"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "faciltiyId"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "contactId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD CONSTRAINT "FK_7bb5b1ab3479cfae5d8ea42ee1d" FOREIGN KEY ("contactId") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
