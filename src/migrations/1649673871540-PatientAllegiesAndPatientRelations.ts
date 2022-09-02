import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllegiesAndPatientRelations1649673871540 implements MigrationInterface {
    name = 'PatientAllegiesAndPatientRelations1649673871540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_d45ed2d88292968d24d95184f4f" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_d45ed2d88292968d24d95184f4f"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "patientId"`);
    }

}
