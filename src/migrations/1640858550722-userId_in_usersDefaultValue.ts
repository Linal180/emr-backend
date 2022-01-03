import {MigrationInterface, QueryRunner} from "typeorm";

export class userIdInUsersDefaultValue1640858550722 implements MigrationInterface {
    name = 'userIdInUsersDefaultValue1640858550722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" SET DEFAULT false`);
    }

}
