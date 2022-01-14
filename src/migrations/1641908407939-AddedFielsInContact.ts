import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFielsInContact1641908407939 implements MigrationInterface {
    name = 'AddedFielsInContact1641908407939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "middleName" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "suffix" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "createdAt" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "suffix"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "middleName"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "name"`);
    }

}
