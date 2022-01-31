import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientDoctorCascade1643197861848 implements MigrationInterface {
    name = 'PatientDoctorCascade1643197861848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
