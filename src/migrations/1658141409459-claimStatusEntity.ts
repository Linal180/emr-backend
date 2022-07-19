import {MigrationInterface, QueryRunner} from "typeorm";

export class claimStatusEntity1658141409459 implements MigrationInterface {
    name = 'claimStatusEntity1658141409459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "claimStatus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "statusName" character varying, "statusId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_98e525cd81c3d1dd49bb911e8e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "claimStatus"`);
    }

}
