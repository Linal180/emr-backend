import {MigrationInterface, QueryRunner} from "typeorm";

export class sectionArrayInMacroEntity1666763170754 implements MigrationInterface {
    name = 'sectionArrayInMacroEntity1666763170754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Macros" ADD "systematic" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Macros" DROP COLUMN "section"`);
        await queryRunner.query(`ALTER TABLE "Macros" ADD "section" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Macros" DROP COLUMN "section"`);
        await queryRunner.query(`ALTER TABLE "Macros" ADD "section" character varying`);
        await queryRunner.query(`ALTER TABLE "Macros" DROP COLUMN "systematic"`);
    }

}
