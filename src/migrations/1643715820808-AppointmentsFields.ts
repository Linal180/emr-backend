import {MigrationInterface, QueryRunner} from "typeorm";

export class AppointmentsFields1643715820808 implements MigrationInterface {
    name = 'AppointmentsFields1643715820808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "token"`);
    }

}
