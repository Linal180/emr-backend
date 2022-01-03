import {MigrationInterface, QueryRunner} from "typeorm";

export class tokenInUsersEntity1640960678410 implements MigrationInterface {
    name = 'tokenInUsersEntity1640960678410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "token"`);
    }

}
