import {MigrationInterface, QueryRunner} from "typeorm";

export class FacilityEntity1641371927524 implements MigrationInterface {
    name = 'FacilityEntity1641371927524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Facilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying, "phone" character varying, "mobile" character varying, "fax" character varying, "stateImmunizationId" character varying, "federalTaxId" character varying, "checkPayableTo" character varying, "bankAccount" character varying, "revenueCode" character varying, "tamxonomyCode" character varying, "pos" character varying, "merchantId" character varying, "hpsaModifier" character varying, "serviceLocationQualifies" character varying, "excludeChargesFromPatient" character varying, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "npi" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b656e4b2d5956659e3baa0759a2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Facilities"`);
    }

}
