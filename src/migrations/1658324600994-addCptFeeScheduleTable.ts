import {MigrationInterface, QueryRunner} from "typeorm";

export class addCptFeeScheduleTable1658324600994 implements MigrationInterface {
    name = 'addCptFeeScheduleTable1658324600994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CptFeeSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "modifier" character varying, "code" character varying, "description" character varying, "shortDescription" character varying, "longDescription" character varying, "serviceFee" character varying, "revenueCode" character varying, "feeScheduleId" uuid, "cptCodesId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_f4708154f77c33389c9e70f5ca1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "modifier"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "cptCode"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "expireDate"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "shortDescription"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "longDescription"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "serviceFee"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "revenueCode"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "expiryDate" character varying`);
        await queryRunner.query(`ALTER TABLE "CptFeeSchedule" ADD CONSTRAINT "FK_207800d1070804c3674c2c0a564" FOREIGN KEY ("feeScheduleId") REFERENCES "FeeSchedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CptFeeSchedule" ADD CONSTRAINT "FK_26241e39729d36a1b38cdd0f70e" FOREIGN KEY ("cptCodesId") REFERENCES "CPTCodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CptFeeSchedule" DROP CONSTRAINT "FK_26241e39729d36a1b38cdd0f70e"`);
        await queryRunner.query(`ALTER TABLE "CptFeeSchedule" DROP CONSTRAINT "FK_207800d1070804c3674c2c0a564"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "expiryDate"`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "revenueCode" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "serviceFee" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "longDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "shortDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "expireDate" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "cptCode" character varying`);
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "modifier" character varying`);
        await queryRunner.query(`DROP TABLE "CptFeeSchedule"`);
    }

}
