import {MigrationInterface, QueryRunner} from "typeorm";

export class addFeeSchduleTable1657868197111 implements MigrationInterface {
    name = 'addFeeSchduleTable1657868197111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FeeSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "procedureCode" character varying, "modifier" character varying, "cptCode" character varying, "effectiveDate" character varying, "expireDate" character varying, "description" character varying, "shortDescription" character varying, "longDescription" character varying, "serviceFee" character varying, "revenueCode" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7f7b817237bd8ff8d35175e3283" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "FeeSchedule"`);
    }

}
