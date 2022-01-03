import {MigrationInterface, QueryRunner} from "typeorm";

export class userTypeFieldInUsers1640857349640 implements MigrationInterface {
    name = 'userTypeFieldInUsers1640857349640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "userType" character varying DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "userType"`);
    }

}
