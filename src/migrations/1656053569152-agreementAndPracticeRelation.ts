import {MigrationInterface, QueryRunner} from "typeorm";

export class agreementAndPracticeRelation1656053569152 implements MigrationInterface {
    name = 'agreementAndPracticeRelation1656053569152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" ADD "practiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Agreements" ADD CONSTRAINT "FK_27d9dfcb652f4fdd8d41ae491d1" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Agreements" DROP CONSTRAINT "FK_27d9dfcb652f4fdd8d41ae491d1"`);
        await queryRunner.query(`ALTER TABLE "Agreements" DROP COLUMN "practiceId"`);
    }

}
