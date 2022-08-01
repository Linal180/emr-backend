import {MigrationInterface, QueryRunner} from "typeorm";

export class changeClaimColumns1659000497604 implements MigrationInterface {
    name = 'changeClaimColumns1659000497604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimMdId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimMdId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "batchId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "batchId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billNpi"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billNpi" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billTaxId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billTaxId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "fileId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "insuranceNumber"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "insuranceNumber" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "receivePayerId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "receivePayerId" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "totalCharge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "totalCharge" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimStatusId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimStatusId" uuid`);
        await queryRunner.query(`ALTER TABLE "claim" ADD CONSTRAINT "UQ_8464ed44cf6c3be58b973d55257" UNIQUE ("claimStatusId")`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "total_charge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "total_charge" double precision`);
        await queryRunner.query(`ALTER TABLE "claim" ADD CONSTRAINT "FK_8464ed44cf6c3be58b973d55257" FOREIGN KEY ("claimStatusId") REFERENCES "claimStatus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP CONSTRAINT "FK_8464ed44cf6c3be58b973d55257"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "total_charge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "total_charge" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP CONSTRAINT "UQ_8464ed44cf6c3be58b973d55257"`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimStatusId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimStatusId" character varying`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "totalCharge"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "totalCharge" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "receivePayerId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "receivePayerId" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "insuranceNumber"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "insuranceNumber" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "fileId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "fileId" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billTaxId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billTaxId" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "billNpi"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "billNpi" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "batchId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "batchId" integer`);
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimMdId"`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "claimMdId" integer`);
    }

}
