import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddressFieldsInEmployer1654859523545 implements MigrationInterface {
    name = 'addAddressFieldsInEmployer1654859523545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD "zipCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "zipCode"`);
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "city"`);
    }

}
