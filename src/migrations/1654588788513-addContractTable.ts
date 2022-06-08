import {MigrationInterface, QueryRunner} from "typeorm";

export class addContractTable1654588788513 implements MigrationInterface {
    name = 'addContractTable1654588788513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contract" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contractNumber" character varying, "organizationName" character varying, CONSTRAINT "PK_8cd4d4774b83e2ab1200d6421db" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Contract"`);
    }

}
