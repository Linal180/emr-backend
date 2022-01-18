import {MigrationInterface, QueryRunner} from "typeorm";

export class facilityTimeZone1642499569100 implements MigrationInterface {
    name = 'facilityTimeZone1642499569100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "timeZone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "timeZone"`);
    }

}
