import {MigrationInterface, QueryRunner} from "typeorm";

export class reviewOfSystemEntity1665137069511 implements MigrationInterface {
    name = 'reviewOfSystemEntity1665137069511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ReviewOfSystem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" uuid, "appointmentId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "REL_2244fe1e65c931b178deff4a4c" UNIQUE ("appointmentId"), CONSTRAINT "PK_f1ecc6fd7847fb3e882a0ce2ae7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD "reviewOfSystemId" uuid`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" ADD CONSTRAINT "FK_fc154bacf3384ddb9a094be7b80" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" ADD CONSTRAINT "FK_2244fe1e65c931b178deff4a4cc" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" ADD CONSTRAINT "FK_685d33e7a3caf0c9575131438df" FOREIGN KEY ("reviewOfSystemId") REFERENCES "ReviewOfSystem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP CONSTRAINT "FK_685d33e7a3caf0c9575131438df"`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" DROP CONSTRAINT "FK_2244fe1e65c931b178deff4a4cc"`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" DROP CONSTRAINT "FK_fc154bacf3384ddb9a094be7b80"`);
        await queryRunner.query(`ALTER TABLE "AnswerResponses" DROP COLUMN "reviewOfSystemId"`);
        await queryRunner.query(`DROP TABLE "ReviewOfSystem"`);
    }

}
