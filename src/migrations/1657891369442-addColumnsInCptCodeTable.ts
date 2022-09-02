import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInCptCodeTable1657891369442 implements MigrationInterface {
    name = 'addColumnsInCptCodeTable1657891369442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" ADD "shortDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "CPTCodes" ADD "longDescription" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" DROP COLUMN "longDescription"`);
        await queryRunner.query(`ALTER TABLE "CPTCodes" DROP COLUMN "shortDescription"`);
    }

}
