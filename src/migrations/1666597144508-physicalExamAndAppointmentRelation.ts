import {MigrationInterface, QueryRunner} from "typeorm";

export class physicalExamAndAppointmentRelation1666597144508 implements MigrationInterface {
    name = 'physicalExamAndAppointmentRelation1666597144508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD CONSTRAINT "UQ_61b5f2f66f6d4f89c36dc5469af" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" ADD CONSTRAINT "FK_61b5f2f66f6d4f89c36dc5469af" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP CONSTRAINT "FK_61b5f2f66f6d4f89c36dc5469af"`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP CONSTRAINT "UQ_61b5f2f66f6d4f89c36dc5469af"`);
        await queryRunner.query(`ALTER TABLE "PhysicalExam" DROP COLUMN "appointmentId"`);
    }

}
