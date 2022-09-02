import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsInUserForms1649927629187 implements MigrationInterface {
    name = 'addColumnsInUserForms1649927629187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UsersFormsElements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "UsersFormsId" character varying NOT NULL, "FormsElementsId" character varying NOT NULL, "value" character varying NOT NULL, "arrayOfStrings" jsonb array NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0f514db251938b361675d1568c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."UsersForms_type_enum"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "PatientId" character varying`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "DoctorId" character varying`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "StaffId" character varying`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "FormId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "SubmitterId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "SubmitterId"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "FormId"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "StaffId"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "DoctorId"`);
        await queryRunner.query(`ALTER TABLE "UsersForms" DROP COLUMN "PatientId"`);
        await queryRunner.query(`CREATE TYPE "public"."UsersForms_type_enum" AS ENUM('date', 'dropdown', 'file', 'number', 'radio', 'text')`);
        await queryRunner.query(`ALTER TABLE "UsersForms" ADD "type" "public"."UsersForms_type_enum" NOT NULL DEFAULT 'text'`);
        await queryRunner.query(`DROP TABLE "UsersFormsElements"`);
    }

}
