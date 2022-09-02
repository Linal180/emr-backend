import {MigrationInterface, QueryRunner} from "typeorm";

export class AppointmentRelations1643282455251 implements MigrationInterface {
    name = 'AppointmentRelations1643282455251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "cliaIdNumber"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "federalTaxId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "isPrivate"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "revenueCode"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "tamxonomyCode"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "insurancePlanType"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "timeZone"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "mammographyCertificationNumber"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "npi"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "isExternal" boolean DEFAULT true`);
        await queryRunner.query(`CREATE TYPE "public"."Appointments_paymenttype_enum" AS ENUM('self', 'Insurance')`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "paymentType" "public"."Appointments_paymenttype_enum" NOT NULL DEFAULT 'self'`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "insuranceCompany" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "membershipID" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "reason" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "notes" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "employment" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "autoAccident" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "otherAccident" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "otherPartyResponsible" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "primaryInsurance" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "secondaryInsurance" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "scheduleDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "appointmentTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "providerId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "UQ_9921e07ec8b044f08c979b5a9be" UNIQUE ("patientId")`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_eac3a15608e28c0d40c2fda9177" FOREIGN KEY ("appointmentTypeId") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_c075aeb791149b45b576ae90929" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_0c827d588a7124965b054061312" FOREIGN KEY ("providerId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_9921e07ec8b044f08c979b5a9be"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_0c827d588a7124965b054061312"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_c075aeb791149b45b576ae90929"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "FK_eac3a15608e28c0d40c2fda9177"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP CONSTRAINT "UQ_9921e07ec8b044f08c979b5a9be"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "appointmentTypeId"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "scheduleDateTime"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "secondaryInsurance"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "primaryInsurance"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "otherPartyResponsible"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "otherAccident"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "autoAccident"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "employment"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "membershipID"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "insuranceCompany"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "paymentType"`);
        await queryRunner.query(`DROP TYPE "public"."Appointments_paymenttype_enum"`);
        await queryRunner.query(`ALTER TABLE "Appointments" DROP COLUMN "isExternal"`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "npi" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "mammographyCertificationNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "timeZone" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "insurancePlanType" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "tamxonomyCode" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "color" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "revenueCode" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "isPrivate" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "federalTaxId" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "cliaIdNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "Appointments" ADD "name" character varying NOT NULL`);
    }

}
