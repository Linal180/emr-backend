import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipVaccineProductWithCptCode1665569090360 implements MigrationInterface {
    name = 'addRelationshipVaccineProductWithCptCode1665569090360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "cptCodeId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "cptCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_3197f9fdb637b39d74b1ba9e155" FOREIGN KEY ("cptCodeId") REFERENCES "CPTCodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_3197f9fdb637b39d74b1ba9e155"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "cptCodeId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "cptCodeId" character varying`);
    }

}
