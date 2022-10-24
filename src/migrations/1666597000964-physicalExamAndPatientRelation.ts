import {MigrationInterface, QueryRunner} from "typeorm";

export class physicalExamAndPatientRelation1666597000964 implements MigrationInterface {
    name = 'physicalExamAndPatientRelation1666597000964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD CONSTRAINT "FK_8c751b024993929eac135265889" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP CONSTRAINT "FK_8c751b024993929eac135265889"`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP COLUMN "patientId"`);
    }

}
