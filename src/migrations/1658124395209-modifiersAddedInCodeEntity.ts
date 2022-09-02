import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiersAddedInCodeEntity1658124395209 implements MigrationInterface {
    name = 'modifiersAddedInCodeEntity1658124395209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Codes" ADD "diagPointer" character varying`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD "m1" character varying`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD "m2" character varying`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD "m3" character varying`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD "m4" character varying`);
        await queryRunner.query(`ALTER TABLE "Codes" ADD "unit" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "m4"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "m3"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "m2"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "m1"`);
        await queryRunner.query(`ALTER TABLE "Codes" DROP COLUMN "diagPointer"`);
    }

}
