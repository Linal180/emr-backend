import {MigrationInterface, QueryRunner} from "typeorm";

export class addedValueInAnswerResponses1665125025474 implements MigrationInterface {
    name = 'addedValueInAnswerResponses1665125025474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD "value" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP COLUMN "value"`);
    }

}
