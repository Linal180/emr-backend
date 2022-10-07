import {MigrationInterface, QueryRunner} from "typeorm";

export class patientIllnessHistoyRealtion1665124751815 implements MigrationInterface {
    name = 'patientIllnessHistoyRealtion1665124751815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP CONSTRAINT "FK_3a4840ef1c970ce30cfb5f43b47"`);
        await queryRunner.query(`CREATE TABLE "AnswerResponses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answerId" uuid, "patientIllnessHistoryId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9aafcb6029bce5acd673d662f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" DROP COLUMN "patientIllnessHistoryId"`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD CONSTRAINT "FK_6c3ee8e28b37dfb0a4d612c39b7" FOREIGN KEY ("answerId") REFERENCES "QuestionAnswers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD CONSTRAINT "FK_8c2a8ddd0ecc328ae365753d57e" FOREIGN KEY ("patientIllnessHistoryId") REFERENCES "PatientIllnessHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP CONSTRAINT "FK_8c2a8ddd0ecc328ae365753d57e"`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP CONSTRAINT "FK_6c3ee8e28b37dfb0a4d612c39b7"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD "patientIllnessHistoryId" uuid`);
        await queryRunner.query(`DROP TABLE "AnswerResponses"`);
        await queryRunner.query(`ALTER TABLE "QuestionAnswers" ADD CONSTRAINT "FK_3a4840ef1c970ce30cfb5f43b47" FOREIGN KEY ("patientIllnessHistoryId") REFERENCES "PatientIllnessHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
