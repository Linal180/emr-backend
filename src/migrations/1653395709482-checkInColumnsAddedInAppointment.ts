import {MigrationInterface, QueryRunner} from "typeorm";

export class checkInColumnsAddedInAppointment1653395709482 implements MigrationInterface {
    name = 'checkInColumnsAddedInAppointment1653395709482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "checkedInAt" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "selfCheckIn" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "selfCheckIn"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "checkedInAt"`);
    }

}
