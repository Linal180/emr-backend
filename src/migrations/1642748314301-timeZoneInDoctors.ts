import {MigrationInterface, QueryRunner} from "typeorm";

export class timeZoneInDoctors1642748314301 implements MigrationInterface {
    name = 'timeZoneInDoctors1642748314301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "timeZone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "timeZone"`);
    }

}
