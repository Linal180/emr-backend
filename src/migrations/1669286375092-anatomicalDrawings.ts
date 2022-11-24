import {MigrationInterface, QueryRunner} from "typeorm";

export class anatomicalDrawings1669286375092 implements MigrationInterface {
    name = 'anatomicalDrawings1669286375092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Attachments_type_enum"`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "type" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."Attachments_type_enum" AS ENUM('doctor', 'form builder', 'lab', 'patient', 'practice', 'staff', 'super-admin')`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "type" "public"."Attachments_type_enum" NOT NULL DEFAULT 'patient'`);
    }

}
