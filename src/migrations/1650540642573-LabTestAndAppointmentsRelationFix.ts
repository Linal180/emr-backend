import {MigrationInterface, QueryRunner} from "typeorm";

export class LabTestAndAppointmentsRelationFix1650540642573 implements MigrationInterface {
    name = 'LabTestAndAppointmentsRelationFix1650540642573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_a861bb4f8b4d1fb8135b7a45e3b"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "labTestsId"`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_bf62e126a9023401c4a039a20e9" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_bf62e126a9023401c4a039a20e9"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "labTestsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_a861bb4f8b4d1fb8135b7a45e3b" FOREIGN KEY ("labTestsId") REFERENCES "LabTests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
