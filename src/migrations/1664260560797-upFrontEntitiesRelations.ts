import {MigrationInterface, QueryRunner} from "typeorm";

export class upFrontEntitiesRelations1664260560797 implements MigrationInterface {
    name = 'upFrontEntitiesRelations1664260560797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD CONSTRAINT "UQ_ce84f6e737b136419a94626af54" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD CONSTRAINT "FK_ce84f6e737b136419a94626af54" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" ADD CONSTRAINT "FK_61c78279c06ecd5be3c5352ca79" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP CONSTRAINT "FK_61c78279c06ecd5be3c5352ca79"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP CONSTRAINT "FK_ce84f6e737b136419a94626af54"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP CONSTRAINT "UQ_ce84f6e737b136419a94626af54"`);
        await queryRunner.query(`ALTER TABLE "UpFrontPayment" DROP COLUMN "appointmentId"`);
    }

}
