import {MigrationInterface, QueryRunner} from "typeorm";

export class billingOnSetDateEnumUpdate1658383375527 implements MigrationInterface {
    name = 'billingOnSetDateEnumUpdate1658383375527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "to" character varying`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD "from" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."Billings_onsetdatetype_enum" RENAME TO "Billings_onsetdatetype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Billings_onsetdatetype_enum" AS ENUM('Date of Accident', 'Date of Hospitalization')`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" TYPE "public"."Billings_onsetdatetype_enum" USING "onsetDateType"::"text"::"public"."Billings_onsetdatetype_enum"`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" SET DEFAULT 'Date of Accident'`);
        await queryRunner.query(`DROP TYPE "public"."Billings_onsetdatetype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Billings_onsetdatetype_enum_old" AS ENUM('Date of Accident', 'Last Menstrual Period', 'Onset of Current Symptoms or Illness')`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" TYPE "public"."Billings_onsetdatetype_enum_old" USING "onsetDateType"::"text"::"public"."Billings_onsetdatetype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Billings" ALTER COLUMN "onsetDateType" SET DEFAULT 'Onset of Current Symptoms or Illness'`);
        await queryRunner.query(`DROP TYPE "public"."Billings_onsetdatetype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Billings_onsetdatetype_enum_old" RENAME TO "Billings_onsetdatetype_enum"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "to"`);
    }

}
