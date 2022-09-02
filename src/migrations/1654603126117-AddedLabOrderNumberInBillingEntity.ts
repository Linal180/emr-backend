import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedLabOrderNumberInBillingEntity1654603126117 implements MigrationInterface {
    name = 'AddedLabOrderNumberInBillingEntity1654603126117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "labOrderNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "labOrderNumber"`);
    }

}
