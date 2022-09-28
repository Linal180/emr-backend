import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInCptCode1664346679140 implements MigrationInterface {
    name = 'addColumnInCptCode1664346679140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" ADD "systematic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CPTCodes" DROP COLUMN "systematic"`);
    }

}
