import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemAndSnowMedCodeRelation1649061930415 implements MigrationInterface {
    name = 'PatientProblemAndSnowMedCodeRelation1649061930415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SnoMedCodes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recordId" character varying, "effectiveTime" character varying, "active" boolean, "moduleId" character varying, "refsetId" character varying, "referencedComponentId" character varying, "mapGroup" character varying, "mapPriority" character varying, "mapRule" character varying, "mapAdvice" character varying, "mapTarget" character varying, "correlationId" character varying, "mapCategoryId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_303fa8e01c9cdeb1e309f30382f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "snowMedCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_b59547779114ab89f85fa08a22c" FOREIGN KEY ("snowMedCodeId") REFERENCES "SnoMedCodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_b59547779114ab89f85fa08a22c"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "snowMedCodeId"`);
        await queryRunner.query(`DROP TABLE "SnoMedCodes"`);
    }

}
