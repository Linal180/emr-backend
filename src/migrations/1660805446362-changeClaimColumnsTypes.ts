import {MigrationInterface, QueryRunner} from "typeorm";

export class changeClaimColumnsTypes1660805446362 implements MigrationInterface {
    name = 'changeClaimColumnsTypes1660805446362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimMdId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimMdId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "batchId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "batchId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billNpi"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billNpi" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billTaxId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billTaxId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "fileId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "insuranceNumber"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "insuranceNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "receivePayerId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "receivePayerId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "totalCharge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "totalCharge" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "totalCharge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "totalCharge" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "receivePayerId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "receivePayerId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "insuranceNumber"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "insuranceNumber" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "fileId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billTaxId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billTaxId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billNpi"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billNpi" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "batchId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "batchId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimMdId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimMdId" double precision`);
    }

}
