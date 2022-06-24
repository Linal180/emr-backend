import {MigrationInterface, QueryRunner} from "typeorm";

export class removeappointmentAndTransactionRelation1655728188330 implements MigrationInterface {
    name = 'removeappointmentAndTransactionRelation1655728188330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "FK_7737a55f8f1e877aa457f25e2db"`);
        await queryRunner.query(`ALTER TABLE "Invoice" RENAME COLUMN "transctionId" TO "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "FK_450bce76ee7d775bb7f3e6aab69" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" DROP CONSTRAINT "FK_450bce76ee7d775bb7f3e6aab69"`);
        await queryRunner.query(`ALTER TABLE "Invoice" RENAME COLUMN "transactionId" TO "transctionId"`);
        await queryRunner.query(`ALTER TABLE "Invoice" ADD CONSTRAINT "FK_7737a55f8f1e877aa457f25e2db" FOREIGN KEY ("transctionId") REFERENCES "Transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
