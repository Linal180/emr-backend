import {MigrationInterface, QueryRunner} from "typeorm";

export class usersIdAssignedByRemovedBy1640847777342 implements MigrationInterface {
    name = 'usersIdAssignedByRemovedBy1640847777342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD "assignedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD "removedByIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_55ffc4fe2b8edabb238d46b3c1b" FOREIGN KEY ("assignedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" ADD CONSTRAINT "FK_b5fe69f7e0497e87c87a746c5b3" FOREIGN KEY ("removedByIdId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_b5fe69f7e0497e87c87a746c5b3"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP CONSTRAINT "FK_55ffc4fe2b8edabb238d46b3c1b"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP COLUMN "removedByIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."UserRole" DROP COLUMN "assignedByIdId"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "userId"`);
    }

}
