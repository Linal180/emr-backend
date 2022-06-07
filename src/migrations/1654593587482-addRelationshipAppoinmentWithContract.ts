import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipAppoinmentWithContract1654593587482 implements MigrationInterface {
    name = 'addRelationshipAppoinmentWithContract1654593587482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contract" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Contract" ADD CONSTRAINT "UQ_c8f9d6defd9e99aca59e8b08442" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "Contract" ADD CONSTRAINT "FK_c8f9d6defd9e99aca59e8b08442" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contract" DROP CONSTRAINT "FK_c8f9d6defd9e99aca59e8b08442"`);
        await queryRunner.query(`ALTER TABLE "Contract" DROP CONSTRAINT "UQ_c8f9d6defd9e99aca59e8b08442"`);
        await queryRunner.query(`ALTER TABLE "Contract" DROP COLUMN "appointmentId"`);
    }

}
