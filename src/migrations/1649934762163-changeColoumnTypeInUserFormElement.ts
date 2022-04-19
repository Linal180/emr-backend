import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColoumnTypeInUserFormElement1649934762163 implements MigrationInterface {
    name = 'changeColoumnTypeInUserFormElement1649934762163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersFormsElements" ALTER COLUMN "value" SET NOT NULL`);
    }

}
