import {MigrationInterface, QueryRunner} from "typeorm";

export class addPatientConsentTable1656070284471 implements MigrationInterface {
    name = 'addPatientConsentTable1656070284471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PatientConsent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "body" character varying, "attachmentId" character varying, "appointmentId" character varying, "patientId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8c1c858fa9781b96c5296e8dc6f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PatientConsent"`);
    }

}
