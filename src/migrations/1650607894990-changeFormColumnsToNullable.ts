import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFormColumnsToNullable1650607894990 implements MigrationInterface {
    name = 'changeFormColumnsToNullable1650607894990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "facilityId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "facilityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "name" SET NOT NULL`);
    }

}
