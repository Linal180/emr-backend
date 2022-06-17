import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedColumnTelehealthLinkInDoctor1655444946805 implements MigrationInterface {
    name = 'AddedColumnTelehealthLinkInDoctor1655444946805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "telehealthLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "telehealthLink"`);
    }

}
