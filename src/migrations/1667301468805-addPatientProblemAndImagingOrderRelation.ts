import {MigrationInterface, QueryRunner} from "typeorm";

export class addPatientProblemAndImagingOrderRelation1667301468805 implements MigrationInterface {
    name = 'addPatientProblemAndImagingOrderRelation1667301468805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD "patientProblemId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD CONSTRAINT "FK_00d81b1740444912a02ec24bb97" FOREIGN KEY ("patientProblemId") REFERENCES "PatientProblems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP CONSTRAINT "FK_00d81b1740444912a02ec24bb97"`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP COLUMN "patientProblemId"`);
    }

}
