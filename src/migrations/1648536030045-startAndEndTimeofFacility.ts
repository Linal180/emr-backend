import {MigrationInterface, QueryRunner} from "typeorm";

export class startAndEndTimeofFacility1648536030045 implements MigrationInterface {
    name = 'startAndEndTimeofFacility1648536030045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "startTime" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "endTime" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "startTime"`);
    }

}
