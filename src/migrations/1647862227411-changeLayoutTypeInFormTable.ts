import {MigrationInterface, QueryRunner} from "typeorm";

export class changeLayoutTypeInFormTable1647862227411 implements MigrationInterface {
    name = 'changeLayoutTypeInFormTable1647862227411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."UsersForms_type_enum" AS ENUM('text', 'number', 'dropdown', 'radio', 'date', 'file')`);
        await queryRunner.query(`CREATE TABLE "UsersForms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."UsersForms_type_enum" NOT NULL DEFAULT 'text', "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_026ffa1f8876e766b7105c9f71e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "layout"`);
        await queryRunner.query(`ALTER TABLE "Forms" ADD "layout" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "layout"`);
        await queryRunner.query(`ALTER TABLE "Forms" ADD "layout" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "UsersForms"`);
        await queryRunner.query(`DROP TYPE "public"."UsersForms_type_enum"`);
    }

}
