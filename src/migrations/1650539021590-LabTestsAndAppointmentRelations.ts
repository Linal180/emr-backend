import {MigrationInterface, QueryRunner} from "typeorm";

export class LabTestsAndAppointmentRelations1650539021590 implements MigrationInterface {
    name = 'LabTestsAndAppointmentRelations1650539021590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "labTestsId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_a861bb4f8b4d1fb8135b7a45e3b" FOREIGN KEY ("labTestsId") REFERENCES "LabTests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_a861bb4f8b4d1fb8135b7a45e3b"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "labTestsId"`);
    }

}
