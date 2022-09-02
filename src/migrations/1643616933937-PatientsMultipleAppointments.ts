import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientsMultipleAppointments1643616933937 implements MigrationInterface {
    name = 'PatientsMultipleAppointments1643616933937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "UQ_9921e07ec8b044f08c979b5a9be"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "UQ_9921e07ec8b044f08c979b5a9be" UNIQUE ("patientId")`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
