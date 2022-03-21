import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffAndPatientEntityChanges1647583297468 implements MigrationInterface {
    name = 'StaffAndPatientEntityChanges1647583297468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "registrationDepartment"`);
        await queryRunner.query(`DROP TYPE "public"."Patients_registrationdepartment_enum"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "primaryDepartment"`);
        await queryRunner.query(`DROP TYPE "public"."Patients_primarydepartment_enum"`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "licenseActiveDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "licenseActiveDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "licenseTermDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "licenseTermDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "registrationDate"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "registrationDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "deceasedDate"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "deceasedDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "statementNoteDateFrom"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "statementNoteDateFrom" character varying`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "statementNoteDateTo"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "statementNoteDateTo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "statementNoteDateTo"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "statementNoteDateTo" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "statementNoteDateFrom"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "statementNoteDateFrom" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "deceasedDate"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "deceasedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "registrationDate"`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "registrationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "licenseTermDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "licenseTermDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "licenseActiveDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "licenseActiveDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_primarydepartment_enum" AS ENUM('clinic', 'hospital', 'lab')`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "primaryDepartment" "public"."Patients_primarydepartment_enum" NOT NULL DEFAULT 'hospital'`);
        await queryRunner.query(`CREATE TYPE "public"."Patients_registrationdepartment_enum" AS ENUM('clinic', 'hospital', 'lab')`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "registrationDepartment" "public"."Patients_registrationdepartment_enum" NOT NULL DEFAULT 'hospital'`);
    }

}
