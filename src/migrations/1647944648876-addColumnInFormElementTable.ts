import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInFormElementTable1647944648876 implements MigrationInterface {
    name = 'addColumnInFormElementTable1647944648876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" ADD "sectionId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FormElements" DROP COLUMN "sectionId"`);
    }

}
