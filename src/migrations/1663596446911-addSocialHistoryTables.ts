import {MigrationInterface, QueryRunner} from "typeorm";

export class addSocialHistoryTables1663596446911 implements MigrationInterface {
    name = 'addSocialHistoryTables1663596446911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DependentQuestions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "note" character varying, "answer" character varying, "questionType" character varying, "options" jsonb, "parentId" character varying, "questionsId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_77308dc717c594f62ab18ec4f86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "note" character varying, "answer" character varying, "questionType" character varying, "options" jsonb, "sectionsId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_8f81bcc6305787ab7dd0d828e21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Sections" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "socialHistoryId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_4b6cce072263b8e9c10478c7a08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SocialHistory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "patientId" uuid, CONSTRAINT "REL_23e69b7c8e45fee9f1bfffcaf7" UNIQUE ("patientId"), CONSTRAINT "PK_4926d0f868733719c88933d9a6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" ADD CONSTRAINT "FK_4f4bc1f85b0ffc557dbec0513e2" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD CONSTRAINT "FK_ef15afadc7a6ae5bf94bb85bcfb" FOREIGN KEY ("sectionsId") REFERENCES "Sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Sections" ADD CONSTRAINT "FK_1b47d63f3d4124cea5131c49fb5" FOREIGN KEY ("socialHistoryId") REFERENCES "SocialHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SocialHistory" ADD CONSTRAINT "FK_23e69b7c8e45fee9f1bfffcaf75" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialHistory" DROP CONSTRAINT "FK_23e69b7c8e45fee9f1bfffcaf75"`);
        await queryRunner.query(`ALTER TABLE "Sections" DROP CONSTRAINT "FK_1b47d63f3d4124cea5131c49fb5"`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_ef15afadc7a6ae5bf94bb85bcfb"`);
        await queryRunner.query(`ALTER TABLE "DependentQuestions" DROP CONSTRAINT "FK_4f4bc1f85b0ffc557dbec0513e2"`);
        await queryRunner.query(`DROP TABLE "SocialHistory"`);
        await queryRunner.query(`DROP TABLE "Sections"`);
        await queryRunner.query(`DROP TABLE "Questions"`);
        await queryRunner.query(`DROP TABLE "DependentQuestions"`);
    }

}
