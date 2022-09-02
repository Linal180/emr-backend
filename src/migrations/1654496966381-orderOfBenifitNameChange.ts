import {MigrationInterface, QueryRunner} from "typeorm";

export class orderOfBenifitNameChange1654496966381 implements MigrationInterface {
    name = 'orderOfBenifitNameChange1654496966381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" RENAME COLUMN "orderOfBenifit" TO "orderOfBenefit"`);
        await queryRunner.query(`ALTER TYPE "public"."policies_orderofbenifit_enum" RENAME TO "policies_orderofbenefit_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."policies_orderofbenefit_enum" RENAME TO "policies_orderofbenifit_enum"`);
        await queryRunner.query(`ALTER TABLE "policies" RENAME COLUMN "orderOfBenefit" TO "orderOfBenifit"`);
    }

}
