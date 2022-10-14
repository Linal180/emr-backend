import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnInMVx1665727090318 implements MigrationInterface {
    name = 'AddColumnInMVx1665727090318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" ADD "systematic" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "systematic"`);
    }

}
