import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnInIcdCodes1664284096449 implements MigrationInterface {
    name = 'AddColumnInIcdCodes1664284096449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ICDCode" ADD "systematic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ICDCode" DROP COLUMN "systematic"`);
    }

}
