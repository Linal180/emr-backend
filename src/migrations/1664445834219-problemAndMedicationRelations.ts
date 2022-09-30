import {MigrationInterface, QueryRunner} from "typeorm";

export class problemAndMedicationRelations1664445834219 implements MigrationInterface {
    name = 'problemAndMedicationRelations1664445834219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "patientProblemId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD CONSTRAINT "FK_47bfb49a2fcd19fef4c980df010" FOREIGN KEY ("patientProblemId") REFERENCES "PatientProblems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP CONSTRAINT "FK_47bfb49a2fcd19fef4c980df010"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "patientProblemId"`);
    }

}
