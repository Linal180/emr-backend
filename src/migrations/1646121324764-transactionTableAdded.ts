import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionTableAdded1646121324764 implements MigrationInterface {
    name = 'transactionTableAdded1646121324764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "transactionId" uuid`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD CONSTRAINT "FK_0eae76109fe999110bca337d33b" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD CONSTRAINT "FK_89091815b91ef0886b0cf1671eb" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD CONSTRAINT "FK_a4a3dbec0c8a78f285a2c968d8d" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" DROP CONSTRAINT "FK_a4a3dbec0c8a78f285a2c968d8d"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP CONSTRAINT "FK_89091815b91ef0886b0cf1671eb"`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP CONSTRAINT "FK_0eae76109fe999110bca337d33b"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "transactionId"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
    }

}
