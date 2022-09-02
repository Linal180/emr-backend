import {MigrationInterface, QueryRunner} from "typeorm";

export class changeClaimEntity1658921174158 implements MigrationInterface {
    name = 'changeClaimEntity1658921174158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "units"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "m1"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "m2"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "m3"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "m4"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "diagPointer"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "diag_ref"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "proc_code"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "charge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "charge" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "charge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "charge" integer`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "proc_code" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "diag_ref" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "diagPointer" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "m4" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "m3" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "m2" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "m1" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "units" integer`);
    }

}
