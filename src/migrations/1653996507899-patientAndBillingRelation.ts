import {MigrationInterface, QueryRunner} from "typeorm";

export class patientAndBillingRelation1653996507899 implements MigrationInterface {
    name = 'patientAndBillingRelation1653996507899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_07ae29f88fc300f9ac2c8a6a326" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_07ae29f88fc300f9ac2c8a6a326"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "patientId"`);
    }

}
