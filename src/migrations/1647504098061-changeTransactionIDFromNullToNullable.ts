import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTransactionIDFromNullToNullable1647504098061 implements MigrationInterface {
    name = 'changeTransactionIDFromNullToNullable1647504098061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "paymentTransactionId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "paymentTransactionId" SET NOT NULL`);
    }

}
