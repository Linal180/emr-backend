import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityType1645443193403 implements MigrationInterface {
    name = 'FacilityType1645443193403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "practiceType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "practiceType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "practiceType" SET DEFAULT 'hospital'`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "practiceType" SET NOT NULL`);
    }

}
