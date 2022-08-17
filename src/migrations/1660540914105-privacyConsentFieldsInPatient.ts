import {MigrationInterface, QueryRunner} from "typeorm";

export class privacyConsentFieldsInPatient1660540914105 implements MigrationInterface {
    name = 'privacyConsentFieldsInPatient1660540914105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "phoneEmailPermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "cellPhonePermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "medicalPermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "resultConsent" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "immunizationConsent" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "medicationHistoryConsent" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "medicationHistoryConsent"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "immunizationConsent"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "resultConsent"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "medicalPermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "cellPhonePermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "phoneEmailPermission"`);
    }

}
