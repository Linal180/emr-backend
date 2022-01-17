import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndUserLogs1641293861464 implements MigrationInterface {
    name = 'userAndUserLogs1641293861464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserLogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entityName" character varying NOT NULL, "assignedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7a2b0c06b977f47df844ab85cc2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "UserLogs"`);
    }

}
