import {MigrationInterface, QueryRunner} from "typeorm";

export class userIdInUsers1640858059684 implements MigrationInterface {
    name = 'userIdInUsers1640858059684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ALTER COLUMN "userId" SET NOT NULL`);
    }

}
