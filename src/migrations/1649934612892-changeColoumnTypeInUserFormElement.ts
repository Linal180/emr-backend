import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColoumnTypeInUserFormElement1649934612892 implements MigrationInterface {
    name = 'changeColoumnTypeInUserFormElement1649934612892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" DROP COLUMN "arrayOfStrings"`);
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ADD "arrayOfStrings" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" DROP COLUMN "arrayOfStrings"`);
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ADD "arrayOfStrings" jsonb array NOT NULL`);
    }

}
