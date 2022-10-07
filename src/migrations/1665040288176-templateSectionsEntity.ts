import {MigrationInterface, QueryRunner} from "typeorm";

export class templateSectionsEntity1665040288176 implements MigrationInterface {
    name = 'templateSectionsEntity1665040288176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TemplateSections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "specialId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9b94fff3d627ebf1ed95ecc88a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TemplateSections"`);
    }

}
