import {MigrationInterface, QueryRunner} from "typeorm";

export class taxonomyAddedInPractice1658842032755 implements MigrationInterface {
    name = 'taxonomyAddedInPractice1658842032755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" ADD "taxonomyCodeId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Practice" DROP COLUMN "taxonomyCodeId"`);
    }

}
