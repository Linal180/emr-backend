import {MigrationInterface, QueryRunner} from "typeorm";

export class checkedOutAtAddedinAppointment1653979314084 implements MigrationInterface {
    name = 'checkedOutAtAddedinAppointment1653979314084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "checkedOutAt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "checkedOutAt"`);
    }

}
