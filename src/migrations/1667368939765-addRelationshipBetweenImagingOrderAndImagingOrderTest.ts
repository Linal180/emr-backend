import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipBetweenImagingOrderAndImagingOrderTest1667368939765 implements MigrationInterface {
    name = 'addRelationshipBetweenImagingOrderAndImagingOrderTest1667368939765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" ADD "imagingOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" ADD CONSTRAINT "FK_f83baa53cbd9d90a80c44234980" FOREIGN KEY ("imagingOrderId") REFERENCES "ImagingOrder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" DROP CONSTRAINT "FK_f83baa53cbd9d90a80c44234980"`);
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" DROP COLUMN "imagingOrderId"`);
    }

}
