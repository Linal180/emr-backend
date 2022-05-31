import {MigrationInterface, QueryRunner} from "typeorm";

export class addActiveColumnInPractice1653378611098 implements MigrationInterface {
    name = 'addActiveColumnInPractice1653378611098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" DROP COLUMN "active"`);
    }

}
