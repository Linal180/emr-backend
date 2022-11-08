import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInCvx1667801408950 implements MigrationInterface {
    name = 'addColumnInCvx1667801408950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" ADD "isDeleted" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "isDeleted"`);
    }

}
