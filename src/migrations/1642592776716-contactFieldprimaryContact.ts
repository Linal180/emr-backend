import {MigrationInterface, QueryRunner} from "typeorm";

export class contactFieldprimaryContact1642592776716 implements MigrationInterface {
    name = 'contactFieldprimaryContact1642592776716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "primaryContact" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "primaryContact"`);
    }

}
