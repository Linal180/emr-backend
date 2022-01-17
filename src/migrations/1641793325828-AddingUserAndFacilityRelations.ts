import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingUserAndFacilityRelations1641793325828 implements MigrationInterface {
    name = 'AddingUserAndFacilityRelations1641793325828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD CONSTRAINT "UQ_d33661c731dd4bc7083a2e0c558" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD CONSTRAINT "FK_d33661c731dd4bc7083a2e0c558" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD CONSTRAINT "FK_a419ed7c9879132ff5c21367f7d" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP CONSTRAINT "FK_a419ed7c9879132ff5c21367f7d"`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP CONSTRAINT "FK_d33661c731dd4bc7083a2e0c558"`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP CONSTRAINT "UQ_d33661c731dd4bc7083a2e0c558"`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" DROP COLUMN "userId"`);
        await queryRunner.query(`CREATE TYPE "public"."Doctors_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`ALTER TABLE "public"."Doctors" ADD "gender" "public"."Doctors_gender_enum" NOT NULL DEFAULT 'male'`);
    }

}
