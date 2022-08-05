import {MigrationInterface, QueryRunner} from "typeorm";

export class insuranceStatusInAppointment1659619293957 implements MigrationInterface {
    name = 'insuranceStatusInAppointment1659619293957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "insuranceStatus" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "insuranceStatus"`);
    }

}
