import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipBetweenImagingTestAndImagingOrderTest1667369310678 implements MigrationInterface {
    name = 'addRelationshipBetweenImagingTestAndImagingOrderTest1667369310678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" ADD "imagingTestId" uuid`);
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" ADD CONSTRAINT "FK_8d185ccb3abfd60963b01942ff2" FOREIGN KEY ("imagingTestId") REFERENCES "ImagingTest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" DROP CONSTRAINT "FK_8d185ccb3abfd60963b01942ff2"`);
        await queryRunner.query(`ALTER TABLE "ImagingOrderTest" DROP COLUMN "imagingTestId"`);
    }

}
