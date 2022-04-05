import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInFormElementTable1648797003058 implements MigrationInterface {
    name = 'addColumnInFormElementTable1648797003058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "isDeleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "isDeleted"`);
    }

}
