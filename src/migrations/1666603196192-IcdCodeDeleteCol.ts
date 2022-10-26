import {MigrationInterface, QueryRunner} from "typeorm";

export class IcdCodeDeleteCol1666603196192 implements MigrationInterface {
    name = 'IcdCodeDeleteCol1666603196192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ICDCode" ADD "isDeleted" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ICDCode" DROP COLUMN "isDeleted"`);
    }

}
