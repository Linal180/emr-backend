import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderNumberInLabTests1652440566360 implements MigrationInterface {
    name = 'addOrderNumberInLabTests1652440566360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "orderNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "orderNumber"`);
    }

}
