import {MigrationInterface, QueryRunner} from "typeorm";

export class addPriorityInIcdCode1665486749496 implements MigrationInterface {
    name = 'addPriorityInIcdCode1665486749496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ICDCode" ADD "priority" bigint DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "CPTCodes" ALTER COLUMN "priority" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" ALTER COLUMN "priority" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "ICDCode" DROP COLUMN "priority"`);
    }

}
