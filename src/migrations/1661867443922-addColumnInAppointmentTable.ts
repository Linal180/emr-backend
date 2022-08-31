import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInAppointmentTable1661867443922 implements MigrationInterface {
    name = 'addColumnInAppointmentTable1661867443922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "cardLast4Digits" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "cardLast4Digits"`);
    }

}
