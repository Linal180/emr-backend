import {MigrationInterface, QueryRunner} from "typeorm";

export class physicalExamEntity1666596860443 implements MigrationInterface {
    name = 'physicalExamEntity1666596860443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PhysicalExam" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "templateIds" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_c87f61fd1d0a212a9dd8d27390a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PhysicalExam"`);
    }

}
