import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityAndContactSpellFix1642068783239 implements MigrationInterface {
    name = 'FacilityAndContactSpellFix1642068783239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_ee343d32225a3cf90fd66392d00"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "faciltiyId" TO "facilitiyId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_81a0957e351b1c76c51bd23c190" FOREIGN KEY ("facilitiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_81a0957e351b1c76c51bd23c190"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" RENAME COLUMN "facilitiyId" TO "faciltiyId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_ee343d32225a3cf90fd66392d00" FOREIGN KEY ("faciltiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
