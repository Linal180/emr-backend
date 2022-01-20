import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityType1641371950070 implements MigrationInterface {
    name = 'FacilityType1641371950070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Facilities_practicetype_enum" AS ENUM('hospital', 'lab', 'clinic')`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "practiceType" "public"."Facilities_practicetype_enum" NOT NULL DEFAULT 'hospital'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "practiceType"`);
        await queryRunner.query(`DROP TYPE "public"."Facilities_practicetype_enum"`);
    }

}
