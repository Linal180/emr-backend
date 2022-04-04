import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemFields1648719812555 implements MigrationInterface {
    name = 'PatientProblemFields1648719812555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."PatientProblems_problemtype_enum" AS ENUM('active', 'historic')`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "problemType" "public"."PatientProblems_problemtype_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`CREATE TYPE "public"."PatientProblems_problemseverity_enum" AS ENUM('chronic', 'acute')`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "problemSeverity" "public"."PatientProblems_problemseverity_enum" NOT NULL DEFAULT 'chronic'`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "problemStartDate" character varying`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "note" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "problemStartDate"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "problemSeverity"`);
        await queryRunner.query(`DROP TYPE "public"."PatientProblems_problemseverity_enum"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "problemType"`);
        await queryRunner.query(`DROP TYPE "public"."PatientProblems_problemtype_enum"`);
    }

}
