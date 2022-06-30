import {MigrationInterface, QueryRunner} from "typeorm";

export class StaffAndPracticeRelation1656580797643 implements MigrationInterface {
    name = 'StaffAndPracticeRelation1656580797643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "practiceId"`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "practiceId" uuid`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD CONSTRAINT "FK_f216b9c9e7882ad0db099a6ae90" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Staff" DROP CONSTRAINT "FK_f216b9c9e7882ad0db099a6ae90"`);
        await queryRunner.query(`ALTER TABLE "Staff" DROP COLUMN "practiceId"`);
        await queryRunner.query(`ALTER TABLE "Staff" ADD "practiceId" character varying`);
    }

}
