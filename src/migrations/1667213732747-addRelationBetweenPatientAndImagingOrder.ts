import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationBetweenPatientAndImagingOrder1667213732747 implements MigrationInterface {
    name = 'addRelationBetweenPatientAndImagingOrder1667213732747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD CONSTRAINT "FK_e7ba97663b45febe37a0b050588" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP CONSTRAINT "FK_e7ba97663b45febe37a0b050588"`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP COLUMN "patientId"`);
    }

}
