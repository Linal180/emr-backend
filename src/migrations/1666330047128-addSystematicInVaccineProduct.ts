import {MigrationInterface, QueryRunner} from "typeorm";

export class addSystematicInVaccineProduct1666330047128 implements MigrationInterface {
    name = 'addSystematicInVaccineProduct1666330047128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "systematic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "systematic"`);
    }

}
