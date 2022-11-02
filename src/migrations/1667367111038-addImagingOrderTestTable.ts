import {MigrationInterface, QueryRunner} from "typeorm";

export class addImagingOrderTestTable1667367111038 implements MigrationInterface {
    name = 'addImagingOrderTestTable1667367111038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ImagingOrderTest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a1fa96b281bd191ce4191cd6ac7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ImagingOrderTest"`);
    }

}
