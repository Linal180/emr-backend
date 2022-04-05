import {MigrationInterface, QueryRunner} from "typeorm";

export class changeFacilityIdInFormRelation1648548935143 implements MigrationInterface {
    name = 'changeFacilityIdInFormRelation1648548935143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "facilityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."Elements_type_enum" RENAME TO "Elements_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Elements_type_enum" AS ENUM('text', 'number', 'dropdown', 'radio', 'date', 'file', 'time', 'select', 'checkbox', 'tel', 'email', 'color', 'image', 'month', 'password', 'url', 'week')`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" TYPE "public"."Elements_type_enum" USING "type"::"text"::"public"."Elements_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" SET DEFAULT 'text'`);
        await queryRunner.query(`DROP TYPE "public"."Elements_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Elements_type_enum_old" AS ENUM('date', 'dropdown', 'file', 'number', 'radio', 'text')`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" TYPE "public"."Elements_type_enum_old" USING "type"::"text"::"public"."Elements_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Elements" ALTER COLUMN "type" SET DEFAULT 'text'`);
        await queryRunner.query(`DROP TYPE "public"."Elements_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Elements_type_enum_old" RENAME TO "Elements_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "facilityId" DROP NOT NULL`);
    }

}
