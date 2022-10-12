import {MigrationInterface, QueryRunner} from "typeorm";

export class createNdcVaccineProductTable1665565293787 implements MigrationInterface {
    name = 'createNdcVaccineProductTable1665565293787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "NdcVaccineProduct" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vaccineProductId" character varying, "ndcCodeId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_87a9aa74d619c4559992be069be" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "NdcVaccineProduct"`);
    }

}
