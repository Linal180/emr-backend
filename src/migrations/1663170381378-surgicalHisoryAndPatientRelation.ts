import {MigrationInterface, QueryRunner} from "typeorm";

export class surgicalHisoryAndPatientRelation1663170381378 implements MigrationInterface {
    name = 'surgicalHisoryAndPatientRelation1663170381378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SurgicalHistory" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "SurgicalHistory" ADD CONSTRAINT "FK_6c9881098fec03384bd58022cac" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SurgicalHistory" DROP CONSTRAINT "FK_6c9881098fec03384bd58022cac"`);
        await queryRunner.query(`ALTER TABLE "SurgicalHistory" DROP COLUMN "patientId"`);
    }

}
