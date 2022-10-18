import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipMvxWithVaccineProduct1665567258301 implements MigrationInterface {
    name = 'addRelationshipMvxWithVaccineProduct1665567258301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "mvxId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "mvxId" uuid`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1" FOREIGN KEY ("mvxId") REFERENCES "MVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "mvxId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "mvxId" character varying`);
    }

}
