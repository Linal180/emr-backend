import {MigrationInterface, QueryRunner} from "typeorm";

export class ObservationsAndLabTestRelations1650543544919 implements MigrationInterface {
    name = 'ObservationsAndLabTestRelations1650543544919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Observations" ADD "labTestId" uuid`);
        await queryRunner.query(`ALTER TABLE "Observations" ADD CONSTRAINT "FK_40ffaeffc7c5cb8422c8ab25cb4" FOREIGN KEY ("labTestId") REFERENCES "LabTests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Observations" DROP CONSTRAINT "FK_40ffaeffc7c5cb8422c8ab25cb4"`);
        await queryRunner.query(`ALTER TABLE "Observations" DROP COLUMN "labTestId"`);
    }

}
