import {MigrationInterface, QueryRunner} from "typeorm";

export class userIdInUserToRole1640951677641 implements MigrationInterface {
    name = 'userIdInUserToRole1640951677641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ALTER COLUMN "roleId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ALTER COLUMN "roleId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_48ca98fafa3cd9a4c1e8caea1fe" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_c09e6f704c7cd9fe2bbc26a1a38" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
