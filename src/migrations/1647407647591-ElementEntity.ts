import {MigrationInterface, QueryRunner} from "typeorm";

export class ElementEntity1647407647591 implements MigrationInterface {
    name = 'ElementEntity1647407647591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Elements_type_enum" AS ENUM('text', 'number', 'dropdown', 'radio', 'date', 'file')`);
        await queryRunner.query(`CREATE TABLE "Elements" ("8" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."Elements_type_enum" NOT NULL DEFAULT 'text', "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0477d27de100696275c63d4407b" PRIMARY KEY ("8"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Elements"`);
        await queryRunner.query(`DROP TYPE "public"."Elements_type_enum"`);
    }

}
