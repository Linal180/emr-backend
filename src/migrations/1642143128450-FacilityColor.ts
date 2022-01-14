import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityColor1642143128450 implements MigrationInterface {
    name = 'FacilityColor1642143128450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "color"`);
    }

}
