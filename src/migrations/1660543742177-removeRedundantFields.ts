import {MigrationInterface, QueryRunner} from "typeorm";

export class removeRedundantFields1660543742177 implements MigrationInterface {
    name = 'removeRedundantFields1660543742177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "medicationHistoryAuthority"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "phonePermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "smsPermission"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "smsPermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "phonePermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "medicationHistoryAuthority" boolean DEFAULT false`);
    }

}
