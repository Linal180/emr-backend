import {MigrationInterface, QueryRunner} from "typeorm";

export class ProblemsAndLabTestRelation1664777156808 implements MigrationInterface {
    name = 'ProblemsAndLabTestRelation1664777156808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "patientProblemId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_01989b538561ae1da0b21b9d689" FOREIGN KEY ("patientProblemId") REFERENCES "PatientProblems"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_01989b538561ae1da0b21b9d689"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "patientProblemId"`);
    }

}
