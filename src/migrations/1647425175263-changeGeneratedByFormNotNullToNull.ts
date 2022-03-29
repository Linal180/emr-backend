import {MigrationInterface, QueryRunner} from "typeorm";

export class changeGeneratedByFormNotNullToNull1647425175263 implements MigrationInterface {
    name = 'changeGeneratedByFormNotNullToNull1647425175263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "paymentMethod" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "paymentMethod" SET NOT NULL`);
    }

}
