import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipInPatientConsent1656080128168 implements MigrationInterface {
    name = 'addRelationshipInPatientConsent1656080128168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" ADD "patientConsentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD CONSTRAINT "UQ_7ad28523d83817f2a3e2b6a78be" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD CONSTRAINT "UQ_59f2c2f1f972cf916123ccd2703" UNIQUE ("patientId")`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD CONSTRAINT "FK_59f2c2f1f972cf916123ccd2703" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD CONSTRAINT "FK_7ad28523d83817f2a3e2b6a78be" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Agreements" ADD CONSTRAINT "FK_bed39fb3001af974b0e0603ae71" FOREIGN KEY ("patientConsentId") REFERENCES "PatientConsent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" DROP CONSTRAINT "FK_bed39fb3001af974b0e0603ae71"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP CONSTRAINT "FK_7ad28523d83817f2a3e2b6a78be"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP CONSTRAINT "FK_59f2c2f1f972cf916123ccd2703"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP CONSTRAINT "UQ_59f2c2f1f972cf916123ccd2703"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD "patientId" character varying`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP CONSTRAINT "UQ_7ad28523d83817f2a3e2b6a78be"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "PatientConsent" ADD "appointmentId" character varying`);
        await queryRunner.query(`ALTER TABLE "Agreements" DROP COLUMN "patientConsentId"`);
    }

}
