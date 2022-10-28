import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnInRoom1666958489901 implements MigrationInterface {
    name = 'AddColumnInRoom1666958489901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Room" DROP COLUMN "practiceId"`);
    }

}
