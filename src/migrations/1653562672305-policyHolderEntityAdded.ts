import {MigrationInterface, QueryRunner} from "typeorm";

export class policyHolderEntityAdded1653562672305 implements MigrationInterface {
    name = 'policyHolderEntityAdded1653562672305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "policyHolder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "certificationNumber" character varying, "employer" character varying, "suffix" character varying, "firstName" character varying, "middleName" character varying, "lastName" character varying, "zipCode" character varying, "address" character varying, "addressCTD" character varying, "city" character varying, "state" character varying, "ssn" character varying, "sex" character varying, "dob" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b64d55e26ea4becd08cb283f105" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "policyHolder"`);
    }

}
