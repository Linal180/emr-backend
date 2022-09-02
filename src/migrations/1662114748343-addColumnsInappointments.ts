import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInappointments1662114748343 implements MigrationInterface {
    name = 'addColumnsInappointments1662114748343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "appointmentDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "timeZone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "timeZone"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "appointmentDate"`);
    }

}
