import {MigrationInterface, QueryRunner} from "typeorm";

export class removeProcedureCode1658136361594 implements MigrationInterface {
    name = 'removeProcedureCode1658136361594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeeSchedule" DROP COLUMN "procedureCode"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FeeSchedule" ADD "procedureCode" character varying`);
    }

}
