import {MigrationInterface, QueryRunner} from "typeorm";

export class appointmentAndBillingRelation1653996225755 implements MigrationInterface {
    name = 'appointmentAndBillingRelation1653996225755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "UQ_148dd799e327a743eaf1e7358e6" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "Billings" ADD CONSTRAINT "FK_148dd799e327a743eaf1e7358e6" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "FK_148dd799e327a743eaf1e7358e6"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP CONSTRAINT "UQ_148dd799e327a743eaf1e7358e6"`);
        await queryRunner.query(`ALTER TABLE "Billings" DROP COLUMN "appointmentId"`);
    }

}
