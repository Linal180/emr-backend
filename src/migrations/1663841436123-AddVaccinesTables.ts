import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVaccinesTables1663841436123 implements MigrationInterface {
    name = 'AddVaccinesTables1663841436123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "NDC" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ndcCode" character varying, "mvxName" character varying, "mvxCode" character varying, "startDate" character varying, "endDate" character varying, "gtin" character varying, "lastUpdate" character varying, "cvxCode" double precision, "cvxDescription" character varying, "ndcType" character varying, "noUseNDC" double precision, "mvxId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_2fe413392fdbca51d4c60220e0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "MVX" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "manufacturerName" character varying, "mvxCode" character varying, "mvxStatus" character varying, "cvxCode" character varying, "cvxId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_3f13f5b594231a63e25dfecdaae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "CVX" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "shortDescription" character varying, "cvxCode" double precision, "mvxCode" character varying, "productStatus" character varying, "updateDate" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_d05a7991563cf9ffd0d12d928bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Vaccine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "administrationDate" character varying, "administerBy" character varying, "amount" character varying, "units" character varying, "route" character varying, "site" character varying, "lotNo" character varying, "expiryDate" character varying, "visGiven" character varying, "visDate" character varying, "cvxId" character varying, "mvxId" character varying, "ndcId" character varying, "patientId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_f7fa777da141bd859463819ecc0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "NDC" ADD CONSTRAINT "FK_4cedba9c91897c464a705c6bc1f" FOREIGN KEY ("mvxId") REFERENCES "MVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD CONSTRAINT "FK_1066af7db3a806b5f30217349e1" FOREIGN KEY ("cvxId") REFERENCES "CVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Vaccine" ADD CONSTRAINT "FK_228c768416bc048780c569e60cf" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Vaccine" DROP CONSTRAINT "FK_228c768416bc048780c569e60cf"`);
        await queryRunner.query(`ALTER TABLE "MVX" DROP CONSTRAINT "FK_1066af7db3a806b5f30217349e1"`);
        await queryRunner.query(`ALTER TABLE "NDC" DROP CONSTRAINT "FK_4cedba9c91897c464a705c6bc1f"`);
        await queryRunner.query(`DROP TABLE "Vaccine"`);
        await queryRunner.query(`DROP TABLE "CVX"`);
        await queryRunner.query(`DROP TABLE "MVX"`);
        await queryRunner.query(`DROP TABLE "NDC"`);
    }

}
