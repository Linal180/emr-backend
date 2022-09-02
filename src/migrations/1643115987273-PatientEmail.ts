import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientEmail1643115987273 implements MigrationInterface {
    name = 'PatientEmail1643115987273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "email"`);
    }

}
