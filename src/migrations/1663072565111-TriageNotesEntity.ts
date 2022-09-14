import {MigrationInterface, QueryRunner} from "typeorm";

export class TriageNotesEntity1663072565111 implements MigrationInterface {
    name = 'TriageNotesEntity1663072565111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TriageNotes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "notes" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_7ed669d5c0a96b9a32729732a3f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "TriageNotes"`);
    }

}
