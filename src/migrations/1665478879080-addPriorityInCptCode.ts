import {MigrationInterface, QueryRunner} from "typeorm";

export class addPriorityInCptCode1665478879080 implements MigrationInterface {
    name = 'addPriorityInCptCode1665478879080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" ADD "priority" bigint DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" DROP COLUMN "priority"`);
    }

}
