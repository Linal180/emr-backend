import {MigrationInterface, QueryRunner} from "typeorm";

export class addFamilyHistoryAndRelativeEntities1663075030846 implements MigrationInterface {
    name = 'addFamilyHistoryAndRelativeEntities1663075030846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "FamilyHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_2cdd3180ade29b12e040381a247" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "FamilyHistoryRelative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relativeName" character varying, "onsetAge" character varying, "died" character varying, "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_995f298956dfeb1d8c7f53afa94" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "FamilyHistoryRelative"`);
        await queryRunner.query(`DROP TABLE "FamilyHistory"`);
    }

}
