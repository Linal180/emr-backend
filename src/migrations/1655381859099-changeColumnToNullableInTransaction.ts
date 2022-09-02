import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnToNullableInTransaction1655381859099 implements MigrationInterface {
    name = 'changeColumnToNullableInTransaction1655381859099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "patientId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "appointmentId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "appointmentId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Transactions" ALTER COLUMN "patientId" SET NOT NULL`);
    }

}
