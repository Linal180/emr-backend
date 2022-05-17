import { MigrationInterface, QueryRunner } from "typeorm";

export class addFormStatusInFormBuilder1652683002426 implements MigrationInterface {
    name = 'addFormStatusInFormBuilder1652683002426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Forms_type_enum" RENAME TO "Forms_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Forms_type_enum" AS ENUM('Appointment', 'Doctor', 'Patient', 'Staff', 'Template', 'Pre-Defined')`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" TYPE "public"."Forms_type_enum" USING "type"::"text"::"public"."Forms_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" SET DEFAULT 'Appointment'`);
        await queryRunner.query(`DROP TYPE "public"."Forms_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Forms_type_enum_old" AS ENUM('Appointment', 'Doctor', 'Patient', 'Staff', 'Template')`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" TYPE "public"."Forms_type_enum_old" USING "type"::"text"::"public"."Forms_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Forms" ALTER COLUMN "type" SET DEFAULT 'Appointment'`);
        await queryRunner.query(`DROP TYPE "public"."Forms_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Forms_type_enum_old" RENAME TO "Forms_type_enum"`);
    }

}
