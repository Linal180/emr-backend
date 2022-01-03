import {MigrationInterface, QueryRunner} from "typeorm";

export class userIdInUsersAndType1640862651176 implements MigrationInterface {
    name = 'userIdInUsersAndType1640862651176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userType" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userType" SET DEFAULT false`);
    }

}
