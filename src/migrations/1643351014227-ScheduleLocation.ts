import {MigrationInterface, QueryRunner} from "typeorm";

export class ScheduleLocation1643351014227 implements MigrationInterface {
    name = 'ScheduleLocation1643351014227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ADD "locationId" uuid`);
        await queryRunner.query(`ALTER TABLE "Schedules" ADD CONSTRAINT "FK_a11ee456c1a7e72bffb6a86acdf" FOREIGN KEY ("locationId") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" DROP CONSTRAINT "FK_a11ee456c1a7e72bffb6a86acdf"`);
        await queryRunner.query(`ALTER TABLE "Schedules" DROP COLUMN "locationId"`);
    }

}
