import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedNulableInMacros1666604712685 implements MigrationInterface {
    name = 'AddedNulableInMacros1666604712685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Macros" ALTER COLUMN "expansion" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Macros" ALTER COLUMN "providers" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Macros" ALTER COLUMN "providers" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Macros" ALTER COLUMN "expansion" SET NOT NULL`);
    }

}
