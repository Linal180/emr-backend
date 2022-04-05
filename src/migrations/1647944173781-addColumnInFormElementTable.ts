import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInFormElementTable1647944173781 implements MigrationInterface {
    name = 'addColumnInFormElementTable1647944173781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "placeholder" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "errorMsg" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "tableName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "columnName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "columnName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "tableName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "errorMsg" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" ALTER COLUMN "placeholder" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "position" character varying NOT NULL`);
    }

}
