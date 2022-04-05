import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemAndDoctorRelations1648723280255 implements MigrationInterface {
    name = 'PatientProblemAndDoctorRelations1648723280255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_93336afd70a309e8990a83d0dd8" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_93336afd70a309e8990a83d0dd8"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "doctorId"`);
    }

}
