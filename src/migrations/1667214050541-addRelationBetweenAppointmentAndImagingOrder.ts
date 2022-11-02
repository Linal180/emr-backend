import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationBetweenAppointmentAndImagingOrder1667214050541 implements MigrationInterface {
    name = 'addRelationBetweenAppointmentAndImagingOrder1667214050541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" ADD CONSTRAINT "FK_f58f637153803a35ef1087f0dc8" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP CONSTRAINT "FK_f58f637153803a35ef1087f0dc8"`);
        await queryRunner.query(`ALTER TABLE "ImagingOrder" DROP COLUMN "appointmentId"`);
    }

}
