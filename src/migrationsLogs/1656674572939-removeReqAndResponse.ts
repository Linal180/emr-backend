import {MigrationInterface, QueryRunner} from "typeorm";

export class removeReqAndResponse1656674572939 implements MigrationInterface {
    name = 'removeReqAndResponse1656674572939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "reqInfo"`);
        await queryRunner.query(`ALTER TABLE "UserLogs" DROP COLUMN "resInfo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "resInfo" character varying`);
        await queryRunner.query(`ALTER TABLE "UserLogs" ADD "reqInfo" character varying`);
    }

}
