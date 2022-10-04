import {MigrationInterface, QueryRunner} from "typeorm";

export class isSignedInLabAndMedication1664862316726 implements MigrationInterface {
    name = 'isSignedInLabAndMedication1664862316726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "isSigned" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "LabTests" ADD "isSigned" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "isSigned"`);
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "isSigned"`);
    }

}
