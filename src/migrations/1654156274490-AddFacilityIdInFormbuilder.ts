import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFacilityIdInFormbuilder1654156274490 implements MigrationInterface {
    name = 'AddFacilityIdInFormbuilder1654156274490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" ADD "practiceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Forms" DROP COLUMN "practiceId"`);
    }

}
