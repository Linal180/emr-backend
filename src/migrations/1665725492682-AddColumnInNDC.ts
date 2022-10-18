import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnInNDC1665725492682 implements MigrationInterface {
    name = 'AddColumnInNDC1665725492682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NDC" ADD "systematic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NDC" DROP COLUMN "systematic"`);
    }

}
