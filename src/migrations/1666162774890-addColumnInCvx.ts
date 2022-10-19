import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInCvx1666162774890 implements MigrationInterface {
    name = 'addColumnInCvx1666162774890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" ADD "systematic" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CVX" DROP COLUMN "systematic"`);
    }

}
