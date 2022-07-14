import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMatrialStatusEnum1657780179560 implements MigrationInterface {
    name = 'changeMatrialStatusEnum1657780179560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Patients_maritialstatus_enum" RENAME TO "Patients_maritialstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_maritialstatus_enum" AS ENUM('single', 'married', 'Widowed', 'Separated', 'Divorced')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" TYPE "public"."Patients_maritialstatus_enum" USING "maritialStatus"::"text"::"public"."Patients_maritialstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" SET DEFAULT 'single'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_maritialstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" SET NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_maritialstatus_enum_old" AS ENUM('Divorced', 'Separated', 'Widowed', 'maried', 'single')`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" TYPE "public"."Patients_maritialstatus_enum_old" USING "maritialStatus"::"text"::"public"."Patients_maritialstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "maritialStatus" SET DEFAULT 'single'`);
        await queryRunner.query(`DROP TYPE "public"."Patients_maritialstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Patients_maritialstatus_enum_old" RENAME TO "Patients_maritialstatus_enum"`);
    }

}
