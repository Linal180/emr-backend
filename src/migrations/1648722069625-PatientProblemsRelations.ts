import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemsRelations1648722069625 implements MigrationInterface {
    name = 'PatientProblemsRelations1648722069625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "iCDCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_2ea2cc82b45418e485cdc82dbc3" FOREIGN KEY ("iCDCodeId") REFERENCES "ICDCode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_476efcf34a8dc4dc6153fe0d0f3" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_476efcf34a8dc4dc6153fe0d0f3"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_2ea2cc82b45418e485cdc82dbc3"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "iCDCodeId"`);
    }

}
