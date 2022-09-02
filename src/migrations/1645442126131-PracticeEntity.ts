import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeEntity1645442126131 implements MigrationInterface {
    name = 'PracticeEntity1645442126131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Practice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying, "fax" character varying, "practiceId" character varying, "ein" character varying, "upin" character varying, "medicare" character varying, "medicaid" character varying, "champus" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_82b42985bd8ee8f662a25a687dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Practice"`);
    }

}
