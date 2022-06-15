import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEthnicityEnum1654857251476 implements MigrationInterface {
    name = 'changeEthnicityEnum1654857251476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Patients_ethnicity_enum" RENAME TO "Patients_ethnicity_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_ethnicity_enum" AS ENUM('none', 'Hispanic or Latino', 'Not Hispanic or Latino', 'Declined to specify')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" TYPE "public"."Patients_ethnicity_enum" USING "ethnicity"::"text"::"public"."Patients_ethnicity_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_ethnicity_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Patients_ethnicity_enum_old" AS ENUM('none', 'centeral American', 'centeral American Indian')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" TYPE "public"."Patients_ethnicity_enum_old" USING "ethnicity"::"text"::"public"."Patients_ethnicity_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "ethnicity" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_ethnicity_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_ethnicity_enum_old" RENAME TO "Patients_ethnicity_enum"`);
    }

}
