import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnInUserElemenets1650872457681 implements MigrationInterface {
    name = 'addColumnInUserElemenets1650872457681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ADD "arrayOfObjects" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" DROP COLUMN "arrayOfObjects"`);
    }

}
