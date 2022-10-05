import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSocialAnswersTables1664805197245 implements MigrationInterface {
    name = 'AddSocialAnswersTables1664805197245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sections" DROP CONSTRAINT "FK_1b47d63f3d4124cea5131c49fb5"`);
        await queryRunner.query(`CREATE TABLE "SocialDependentAnswer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "note" character varying, "parentId" character varying, "value" character varying, "socialAnswerId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_86e60e2b5e86bba2ef59ff15316" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SocialAnswer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "note" character varying, "value" character varying, "socialHistoryId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_be862ebc1f1e1c400a2a945b237" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Sections" DROP COLUMN "socialHistoryId"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" ADD CONSTRAINT "FK_6eb033fe4a72c73ac80a560bbc0" FOREIGN KEY ("socialAnswerId") REFERENCES "SocialAnswer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "SocialAnswer" ADD CONSTRAINT "FK_9c625c86afe67a935b3f4ae065a" FOREIGN KEY ("socialHistoryId") REFERENCES "SocialHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SocialAnswer" DROP CONSTRAINT "FK_9c625c86afe67a935b3f4ae065a"`);
        await queryRunner.query(`ALTER TABLE "SocialDependentAnswer" DROP CONSTRAINT "FK_6eb033fe4a72c73ac80a560bbc0"`);
        await queryRunner.query(`ALTER TABLE "Sections" ADD "socialHistoryId" uuid`);
        await queryRunner.query(`DROP TABLE "SocialAnswer"`);
        await queryRunner.query(`DROP TABLE "SocialDependentAnswer"`);
        await queryRunner.query(`ALTER TABLE "Sections" ADD CONSTRAINT "FK_1b47d63f3d4124cea5131c49fb5" FOREIGN KEY ("socialHistoryId") REFERENCES "SocialHistory"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
