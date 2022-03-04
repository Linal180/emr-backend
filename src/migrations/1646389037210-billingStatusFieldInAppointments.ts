import {MigrationInterface, QueryRunner} from "typeorm";

export class billingStatusFieldInAppointments1646389037210 implements MigrationInterface {
    name = 'billingStatusFieldInAppointments1646389037210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Appointments_billingstatus_enum" AS ENUM('paid', 'due')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "billingStatus" "public"."Appointments_billingstatus_enum" NOT NULL DEFAULT 'due'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "billingStatus"`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_billingstatus_enum"`);
    }

}
