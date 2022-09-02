import {MigrationInterface, QueryRunner} from "typeorm";

export class pricingProductTypeMakeNullable1661338987969 implements MigrationInterface {
    name = 'pricingProductTypeMakeNullable1661338987969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ALTER COLUMN "pricingProductType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "policies" ALTER COLUMN "pricingProductType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ALTER COLUMN "pricingProductType" SET DEFAULT 'Automobile Medical'`);
        await queryRunner.query(`ALTER TABLE "policies" ALTER COLUMN "pricingProductType" SET NOT NULL`);
    }

}
