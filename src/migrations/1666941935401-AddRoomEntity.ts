import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoomEntity1666941935401 implements MigrationInterface {
    name = 'AddRoomEntity1666941935401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "number" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_867d589be92524f89375e2e086d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Room"`);
    }

}
