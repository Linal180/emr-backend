import {MigrationInterface, QueryRunner} from "typeorm";

export class isPrimaryFieldInFacility1646299804720 implements MigrationInterface {
    name = 'isPrimaryFieldInFacility1646299804720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "isPrimary" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "isPrimary"`);
    }

}
