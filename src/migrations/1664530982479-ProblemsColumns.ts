import {MigrationInterface, QueryRunner} from "typeorm";

export class ProblemsColumns1664530982479 implements MigrationInterface {
    name = 'ProblemsColumns1664530982479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "isSigned" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "forOrders" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "forOrders"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "isSigned"`);
    }

}
