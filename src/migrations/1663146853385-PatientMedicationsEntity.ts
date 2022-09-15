import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientMedicationsEntity1663146853385 implements MigrationInterface {
    name = 'PatientMedicationsEntity1663146853385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PatientMedication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sig" character varying, "takeAmount" character varying, "tabletUnit" character varying, "timeDuration" character varying, "noOfDays" character varying, "startDate" character varying, "status" character varying, "stopDate" character varying, "stopReason" character varying, "note" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_fd01bc6367c98622fa0999eb354" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PatientMedication"`);
    }

}
