import {MigrationInterface, QueryRunner} from "typeorm";

export class TestSpecimensAndSpecimenTypeRelation1650540941896 implements MigrationInterface {
    name = 'TestSpecimensAndSpecimenTypeRelation1650540941896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TestSpecimens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "collectionDate" character varying, "collectionTime" character varying, "specimenNotes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "specimenTypesId" uuid, CONSTRAINT "PK_11c9408379960cae0f6803ddb30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" ADD CONSTRAINT "FK_e6b2ec31f22d259f6482f819b72" FOREIGN KEY ("specimenTypesId") REFERENCES "SpecimenTypes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TestSpecimens" DROP CONSTRAINT "FK_e6b2ec31f22d259f6482f819b72"`);
        await queryRunner.query(`DROP TABLE "TestSpecimens"`);
    }

}
