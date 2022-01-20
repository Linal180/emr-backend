import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedFewFieldsInContact1641911069571 implements MigrationInterface {
    name = 'AddedFewFieldsInContact1641911069571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "ssn" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "employerName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "employerName"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "ssn"`);
    }

}
