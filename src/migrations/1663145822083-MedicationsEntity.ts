import {MigrationInterface, QueryRunner} from "typeorm";

export class MedicationsEntity1663145822083 implements MigrationInterface {
    name = 'MedicationsEntity1663145822083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Medications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying, "termType" character varying, "rxNumber" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_97fd9c126414ba14136a1c7a661" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Medications"`);
    }

}
