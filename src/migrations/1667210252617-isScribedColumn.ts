import {MigrationInterface, QueryRunner} from "typeorm";

export class isScribedColumn1667210252617 implements MigrationInterface {
    name = 'isScribedColumn1667210252617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Scribe" ADD "isScribed" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Scribe" DROP COLUMN "isScribed"`);
    }

}
