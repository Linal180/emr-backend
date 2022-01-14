import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedNullableToCreatedAt1641908667482 implements MigrationInterface {
    name = 'AddedNullableToCreatedAt1641908667482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
