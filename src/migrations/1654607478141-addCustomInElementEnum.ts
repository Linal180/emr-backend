import {MigrationInterface, QueryRunner} from "typeorm";

export class addCustomInElementEnum1654607478141 implements MigrationInterface {
    name = 'addCustomInElementEnum1654607478141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Elements_type_enum" RENAME TO "Elements_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Elements_type_enum" AS ENUM('text', 'number', 'dropdown', 'radio', 'date', 'file', 'time', 'select', 'checkbox', 'tel', 'email', 'color', 'image', 'month', 'password', 'url', 'week', 'custom')`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" TYPE "public"."Elements_type_enum" USING "type"::"text"::"public"."Elements_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" SET DEFAULT 'text'`);
        await queryRunner.query(`DROP TYPE "public"."Elements_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Elements_type_enum_old" AS ENUM('text', 'number', 'dropdown', 'radio', 'date', 'file', 'time', 'select', 'checkbox', 'tel', 'email', 'color', 'image', 'month', 'password', 'url', 'week')`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" TYPE "public"."Elements_type_enum_old" USING "type"::"text"::"public"."Elements_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" SET DEFAULT 'text'`);
        await queryRunner.query(`DROP TYPE "public"."Elements_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Elements_type_enum_old" RENAME TO "Elements_type_enum"`);
    }

}
