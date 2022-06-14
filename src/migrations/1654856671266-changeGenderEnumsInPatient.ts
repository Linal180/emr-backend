import {MigrationInterface, QueryRunner} from "typeorm";

export class changeGenderEnumsInPatient1654856671266 implements MigrationInterface {
    name = 'changeGenderEnumsInPatient1654856671266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Patients_gender_enum" RENAME TO "Patients_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_gender_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Decline to specify', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" TYPE "public"."Patients_gender_enum" USING "gender"::"text"::"public"."Patients_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" SET DEFAULT 'Identifies as Male'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_gender_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_genderidentity_enum" RENAME TO "Patients_genderidentity_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_genderidentity_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Decline to specify', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" TYPE "public"."Patients_genderidentity_enum" USING "genderIdentity"::"text"::"public"."Patients_genderidentity_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_genderidentity_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_sexatbirth_enum" RENAME TO "Patients_sexatbirth_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_sexatbirth_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Decline to specify', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" TYPE "public"."Patients_sexatbirth_enum" USING "sexAtBirth"::"text"::"public"."Patients_sexatbirth_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_sexatbirth_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Patients_sexatbirth_enum_old" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" TYPE "public"."Patients_sexatbirth_enum_old" USING "sexAtBirth"::"text"::"public"."Patients_sexatbirth_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "sexAtBirth" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_sexatbirth_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_sexatbirth_enum_old" RENAME TO "Patients_sexatbirth_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_genderidentity_enum_old" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" TYPE "public"."Patients_genderidentity_enum_old" USING "genderIdentity"::"text"::"public"."Patients_genderidentity_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "genderIdentity" SET DEFAULT 'Choose not to disclose'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_genderidentity_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_genderidentity_enum_old" RENAME TO "Patients_genderidentity_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_gender_enum_old" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" TYPE "public"."Patients_gender_enum_old" USING "gender"::"text"::"public"."Patients_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "gender" SET DEFAULT 'Identifies as Male'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_gender_enum_old" RENAME TO "Patients_gender_enum"`);
    }

}
