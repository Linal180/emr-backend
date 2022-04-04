import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemAndAppointmentsRelation1648723740744 implements MigrationInterface {
    name = 'PatientProblemAndAppointmentsRelation1648723740744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_82562418997d86f84379f40edd4" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_82562418997d86f84379f40edd4"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "appointmentId"`);
    }

}
