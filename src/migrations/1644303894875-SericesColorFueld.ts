import {MigrationInterface, QueryRunner} from "typeorm";

export class SericesColorFueld1644303894875 implements MigrationInterface {
    name = 'SericesColorFueld1644303894875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Services" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Services" DROP COLUMN "color"`);
    }

}
