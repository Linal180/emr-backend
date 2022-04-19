import {MigrationInterface, QueryRunner} from "typeorm";

export class isActiveColumnAddedInForm1650269437225 implements MigrationInterface {
    name = 'isActiveColumnAddedInForm1650269437225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" ADD "isActive" boolean DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "isActive"`);
    }

}
