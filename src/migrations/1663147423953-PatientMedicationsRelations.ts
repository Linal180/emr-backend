import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientMedicationsRelations1663147423953 implements MigrationInterface {
    name = 'PatientMedicationsRelations1663147423953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "medicationId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD CONSTRAINT "FK_8aba3f081237bf4a62b71ef649f" FOREIGN KEY ("medicationId") REFERENCES "Medications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD CONSTRAINT "FK_bc25d80026c6290168ca0b8b369" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP CONSTRAINT "FK_bc25d80026c6290168ca0b8b369"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP CONSTRAINT "FK_8aba3f081237bf4a62b71ef649f"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "medicationId"`);
    }

}
