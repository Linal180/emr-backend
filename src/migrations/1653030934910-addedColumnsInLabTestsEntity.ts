import {MigrationInterface, QueryRunner} from "typeorm";

export class addedColumnsInLabTestsEntity1653030934910 implements MigrationInterface {
    name = 'addedColumnsInLabTestsEntity1653030934910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "collectedDate" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "receivedDate" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "accessionNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "labName" character varying`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "vendorName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "vendorName"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "labName"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "accessionNumber"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "receivedDate"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "collectedDate"`);
    }

}
