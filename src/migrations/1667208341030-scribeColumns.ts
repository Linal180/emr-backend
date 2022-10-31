import {MigrationInterface, QueryRunner} from "typeorm";

export class scribeColumns1667208341030 implements MigrationInterface {
    name = 'scribeColumns1667208341030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Scribe" ADD "userType" character varying`);
        await queryRunner.query(`ALTER TABLE "Scribe" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "Scribe" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "Scribe" ADD "lastName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Scribe" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "Scribe" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "Scribe" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Scribe" DROP COLUMN "userType"`);
    }

}
