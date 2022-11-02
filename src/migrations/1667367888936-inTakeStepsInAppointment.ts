import {MigrationInterface, QueryRunner} from "typeorm";

export class inTakeStepsInAppointment1667367888936 implements MigrationInterface {
    name = 'inTakeStepsInAppointment1667367888936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "intakeSteps" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "intakeSteps"`);
    }

}
