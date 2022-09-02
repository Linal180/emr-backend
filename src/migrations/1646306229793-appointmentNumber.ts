import {MigrationInterface, QueryRunner} from "typeorm";

export class appointmentNumber1646306229793 implements MigrationInterface {
    name = 'appointmentNumber1646306229793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "bookingNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "bookingNumber"`);
    }

}
