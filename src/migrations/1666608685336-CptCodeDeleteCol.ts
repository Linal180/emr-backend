import {MigrationInterface, QueryRunner} from "typeorm";

export class CptCodeDeleteCol1666608685336 implements MigrationInterface {
    name = 'CptCodeDeleteCol1666608685336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" ADD "isDeleted" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" DROP COLUMN "isDeleted"`);
    }

}
