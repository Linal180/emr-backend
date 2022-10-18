import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipVaccineProductWithNdcVaccineProduct1665567773903 implements MigrationInterface {
    name = 'addRelationshipVaccineProductWithNdcVaccineProduct1665567773903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP COLUMN "vaccineProductId"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD "vaccineProductId" uuid`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD CONSTRAINT "FK_86406dd52e354cbf019647c61df" FOREIGN KEY ("vaccineProductId") REFERENCES "VaccineProduct"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP CONSTRAINT "FK_86406dd52e354cbf019647c61df"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP COLUMN "vaccineProductId"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD "vaccineProductId" character varying`);
    }

}
