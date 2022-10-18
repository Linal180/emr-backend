import { MigrationInterface, QueryRunner } from "typeorm";

export class createVaccineProductTable1665565293788 implements MigrationInterface {
    name = 'createVaccineProductTable1665565293788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "VaccineProduct" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "status" character varying, "cvxId" character varying, "mvxId" character varying, "cptCodeId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_4065b2e73d9021514a346f637c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "VaccineProduct"`);
    }

}
