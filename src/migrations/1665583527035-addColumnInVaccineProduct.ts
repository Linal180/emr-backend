import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInVaccineProduct1665583527035 implements MigrationInterface {
    name = 'addColumnInVaccineProduct1665583527035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Vaccine" RENAME COLUMN "cvxId" TO "vaccineProductId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "updateDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "updateDate"`);
        await queryRunner.query(`ALTER TABLE "Vaccine" RENAME COLUMN "vaccineProductId" TO "cvxId"`);
    }

}
