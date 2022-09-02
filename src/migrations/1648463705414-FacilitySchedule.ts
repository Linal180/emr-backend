import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilitySchedule1648463705414 implements MigrationInterface {
    name = 'FacilitySchedule1648463705414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Schedules" ADD CONSTRAINT "FK_8c6f513cfe3bdd86fb939e2204e" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" DROP CONSTRAINT "FK_8c6f513cfe3bdd86fb939e2204e"`);
        await queryRunner.query(`ALTER TABLE "Schedules" DROP COLUMN "facilityId"`);
    }

}
