import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffRemovedPriamryProvider1647589821747 implements MigrationInterface {
    name = 'StaffRemovedPriamryProvider1647589821747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "primaryProvider"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" ADD "primaryProvider" character varying`);
    }

}
