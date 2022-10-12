import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInMvx1665584152417 implements MigrationInterface {
    name = 'addColumnInMvx1665584152417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" ADD "updateDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "updateDate"`);
    }

}
