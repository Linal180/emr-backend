import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTransactionRelation1655725487474 implements MigrationInterface {
    name = 'changeTransactionRelation1655725487474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP CONSTRAINT "FK_0eae76109fe999110bca337d33b"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP CONSTRAINT "FK_89091815b91ef0886b0cf1671eb"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP CONSTRAINT "FK_a4a3dbec0c8a78f285a2c968d8d"`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_c4813ed164c7ce300a2ca074673" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_369cda101e87efc895b85f1bb08" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_2ad0478a58dd33a0975c3a76de5" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_2ad0478a58dd33a0975c3a76de5"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_369cda101e87efc895b85f1bb08"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_c4813ed164c7ce300a2ca074673"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "facilityId" character varying`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "doctorId" character varying`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "patientId" character varying`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD CONSTRAINT "FK_a4a3dbec0c8a78f285a2c968d8d" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD CONSTRAINT "FK_89091815b91ef0886b0cf1671eb" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD CONSTRAINT "FK_0eae76109fe999110bca337d33b" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
