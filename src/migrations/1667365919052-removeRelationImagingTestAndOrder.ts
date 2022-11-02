import {MigrationInterface, QueryRunner} from "typeorm";

export class removeRelationImagingTestAndOrder1667365919052 implements MigrationInterface {
    name = 'removeRelationImagingTestAndOrder1667365919052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingTest" DROP CONSTRAINT "FK_d9fce53a11708d80111401aba2b"`);
        await queryRunner.query(`ALTER TABLE "ImagingTest" DROP COLUMN "imagingOrderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingTest" ADD "imagingOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingTest" ADD CONSTRAINT "FK_d9fce53a11708d80111401aba2b" FOREIGN KEY ("imagingOrderId") REFERENCES "ImagingOrder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
