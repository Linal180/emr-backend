import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInTestImaging1668412591649 implements MigrationInterface {
    name = 'addColumnInTestImaging1668412591649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingTest" ADD "active" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingTest" DROP COLUMN "active"`);
    }

}
