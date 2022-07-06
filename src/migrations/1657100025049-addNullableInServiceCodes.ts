import {MigrationInterface, QueryRunner} from "typeorm";

export class addNullableInServiceCodes1657100025049 implements MigrationInterface {
    name = 'addNullableInServiceCodes1657100025049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "serviceCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Contacts" ALTER COLUMN "serviceCode" SET NOT NULL`);
    }

}
