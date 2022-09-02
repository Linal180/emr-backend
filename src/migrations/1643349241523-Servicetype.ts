import {MigrationInterface, QueryRunner} from "typeorm";

export class Servicetype1643349241523 implements MigrationInterface {
    name = 'Servicetype1643349241523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Services_servicetype_enum" AS ENUM('internal', 'external')`);
        await queryRunner.query(`ALTER TABLE "Services" ADD "serviceType" "public"."Services_servicetype_enum" NOT NULL DEFAULT 'external'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Services" DROP COLUMN "serviceType"`);
        await queryRunner.query(`DROP TYPE "public"."Services_servicetype_enum"`);
    }

}
