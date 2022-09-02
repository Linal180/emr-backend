import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeAndEntityRelation1645442311792 implements MigrationInterface {
    name = 'PracticeAndEntityRelation1645442311792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" ADD "practiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Facilities" ADD CONSTRAINT "FK_4b5cc5349f2b3b66dd8e75d3779" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Facilities" DROP CONSTRAINT "FK_4b5cc5349f2b3b66dd8e75d3779"`);
        await queryRunner.query(`ALTER TABLE "Facilities" DROP COLUMN "practiceId"`);
    }

}
