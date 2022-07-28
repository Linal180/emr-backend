import {MigrationInterface, QueryRunner} from "typeorm";

export class liveClaimFeedData1658907690722 implements MigrationInterface {
    name = 'liveClaimFeedData1658907690722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LiveClaimFeed" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paidDate" character varying, "provAddress1" character varying, "provState" character varying, "provCompanyId" character varying, "provCity" character varying, "payerAddress1" character varying, "provRouting" character varying, "payerRouting" character varying, "provTaxId" character varying, "fromDos" character varying, "patientFullName" character varying, "InsuranceFullName" character varying, "totalPaid" character varying, "thruDos" character varying, "crossOverCarrier" character varying, "crossOverId" character varying, "pcn" character varying, "provNpi" character varying, "totalCharge" character varying, "charge" jsonb NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_bad4f039f76b57d16d153215fc6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "LiveClaimFeed"`);
    }

}
