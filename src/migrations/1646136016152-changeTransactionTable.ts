import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTransactionTable1646136016152 implements MigrationInterface {
    name = 'changeTransactionTable1646136016152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "patientId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "doctorId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "facilityId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "appointmentId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "paymentStatus" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "patientId"`);
    }

}
