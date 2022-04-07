import {MigrationInterface, QueryRunner} from "typeorm";

export class doctorEntityDatesToString1649318775604 implements MigrationInterface {
    name = 'doctorEntityDatesToString1649318775604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "deaActiveDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "deaActiveDate" character varying`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "deaTermDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "deaTermDate" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "deaTermDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "deaTermDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Doctors" DROP COLUMN "deaActiveDate"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ADD "deaActiveDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
