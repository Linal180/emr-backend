import {MigrationInterface, QueryRunner} from "typeorm";

export class LabTestsAndPatientRelationship1650532641273 implements MigrationInterface {
    name = 'LabTestsAndPatientRelationship1650532641273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_74331017798f3d5d637e349afc3" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_74331017798f3d5d637e349afc3"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "patientId"`);
    }

}
