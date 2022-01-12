import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFielsInContact1641908559010 implements MigrationInterface {
    name = 'AddedFielsInContact1641908559010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "createdAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "createdAt" SET NOT NULL`);
    }

}
