import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewAttachmentTypes1651124505197 implements MigrationInterface {
    name = 'addNewAttachmentTypes1651124505197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Attachments_type_enum" RENAME TO "Attachments_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum" AS ENUM('patient', 'doctor', 'lab', 'form builder', 'super-admin', 'staff')`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" TYPE "public"."Attachments_type_enum" USING "type"::"text"::"public"."Attachments_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" SET DEFAULT 'patient'`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum_old" AS ENUM('doctor', 'form builder', 'lab', 'patient')`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" TYPE "public"."Attachments_type_enum_old" USING "type"::"text"::"public"."Attachments_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" SET DEFAULT 'patient'`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Attachments_type_enum_old" RENAME TO "Attachments_type_enum"`);
    }

}
