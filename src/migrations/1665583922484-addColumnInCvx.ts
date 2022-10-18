import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInCvx1665583922484 implements MigrationInterface {
    name = 'addColumnInCvx1665583922484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" ADD "updateDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "updateDate"`);
    }

}
