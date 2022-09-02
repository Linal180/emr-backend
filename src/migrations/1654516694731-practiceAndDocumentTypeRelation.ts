import {MigrationInterface, QueryRunner} from "typeorm";

export class practiceAndDocumentTypeRelation1654516694731 implements MigrationInterface {
    name = 'practiceAndDocumentTypeRelation1654516694731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DocumentType" ADD "practiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "DocumentType" ADD CONSTRAINT "FK_799388ecaf09eb1b25ea3517a27" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DocumentType" DROP CONSTRAINT "FK_799388ecaf09eb1b25ea3517a27"`);
        await queryRunner.query(`ALTER TABLE "DocumentType" DROP COLUMN "practiceId"`);
    }

}
