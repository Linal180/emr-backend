import {MigrationInterface, QueryRunner} from "typeorm";

export class colorFieldInContact1642424073799 implements MigrationInterface {
    name = 'colorFieldInContact1642424073799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "color" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "color"`);
    }

}
