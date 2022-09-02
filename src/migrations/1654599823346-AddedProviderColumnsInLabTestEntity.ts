import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedProviderColumnsInLabTestEntity1654599823346 implements MigrationInterface {
    name = 'AddedProviderColumnsInLabTestEntity1654599823346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "providerNotes" text`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "primaryProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "referringProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_c1dee225430c0fb908bcaac0819" FOREIGN KEY ("primaryProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_79e17f92030b893b5b76ca93cbb" FOREIGN KEY ("referringProviderId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_79e17f92030b893b5b76ca93cbb"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_c1dee225430c0fb908bcaac0819"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "referringProviderId"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "primaryProviderId"`);
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "providerNotes"`);
    }

}
