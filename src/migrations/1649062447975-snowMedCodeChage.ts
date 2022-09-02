import {MigrationInterface, QueryRunner} from "typeorm";

export class snowMedCodeChage1649062447975 implements MigrationInterface {
    name = 'snowMedCodeChage1649062447975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SnoMedCodes" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "SnoMedCodes" ADD "active" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SnoMedCodes" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "SnoMedCodes" ADD "active" boolean`);
    }

}
