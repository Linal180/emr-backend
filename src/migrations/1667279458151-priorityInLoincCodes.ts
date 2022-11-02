import {MigrationInterface, QueryRunner} from "typeorm";

export class priorityInLoincCodes1667279458151 implements MigrationInterface {
    name = 'priorityInLoincCodes1667279458151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LoincCodes" ADD "priority" bigint DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LoincCodes" DROP COLUMN "priority"`);
    }

}
