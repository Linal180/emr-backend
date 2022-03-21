import {MigrationInterface, QueryRunner} from "typeorm";

export class PermissionsTable1647849065088 implements MigrationInterface {
    name = 'PermissionsTable1647849065088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "status" boolean DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e83fa8a46bd5a3bfaa095d40812" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Permissions"`);
    }

}
