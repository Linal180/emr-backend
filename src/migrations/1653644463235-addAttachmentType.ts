import {MigrationInterface, QueryRunner} from "typeorm";

export class addAttachmentType1653644463235 implements MigrationInterface {
    name = 'addAttachmentType1653644463235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Attachments_type_enum" RENAME TO "Attachments_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum" AS ENUM('patient', 'doctor', 'lab', 'form builder', 'super-admin', 'staff', 'practice')`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" TYPE "public"."Attachments_type_enum" USING "type"::"text"::"public"."Attachments_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" SET DEFAULT 'patient'`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum_old" AS ENUM('doctor', 'form builder', 'lab', 'patient', 'staff', 'super-admin')`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" TYPE "public"."Attachments_type_enum_old" USING "type"::"text"::"public"."Attachments_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ALTER COLUMN "type" SET DEFAULT 'patient'`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Attachments_type_enum_old" RENAME TO "Attachments_type_enum"`);
    }

}
