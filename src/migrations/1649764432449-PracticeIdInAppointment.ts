import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeIdInAppointment1649764432449 implements MigrationInterface {
    name = 'PracticeIdInAppointment1649764432449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "practiceId"`);
    }

}
