import {MigrationInterface, QueryRunner} from "typeorm";

export class patientIllnessHistoryEntity1665123670321 implements MigrationInterface {
    name = 'patientIllnessHistoryEntity1665123670321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PatientIllnessHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" uuid, "appointmentId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "REL_3025007f2644f69a7b169a1a3a" UNIQUE ("appointmentId"), CONSTRAINT "PK_2e4be53f7f16c1428d62d7deaa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "patientIllnessHistoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "FK_3a4840ef1c970ce30cfb5f43b47" FOREIGN KEY ("patientIllnessHistoryId") REFERENCES "PatientIllnessHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" ADD CONSTRAINT "FK_12943d19143f3bfa419c8b15b62" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" ADD CONSTRAINT "FK_3025007f2644f69a7b169a1a3a8" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" DROP CONSTRAINT "FK_3025007f2644f69a7b169a1a3a8"`);
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" DROP CONSTRAINT "FK_12943d19143f3bfa419c8b15b62"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "FK_3a4840ef1c970ce30cfb5f43b47"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "patientIllnessHistoryId"`);
        await queryRunner.query(`DROP TABLE "PatientIllnessHistory"`);
    }

}
