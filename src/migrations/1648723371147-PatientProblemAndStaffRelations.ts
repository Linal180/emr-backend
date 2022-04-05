import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientProblemAndStaffRelations1648723371147 implements MigrationInterface {
    name = 'PatientProblemAndStaffRelations1648723371147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD "staffId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" ADD CONSTRAINT "FK_a881f8302e988e905ce21cdbe49" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP CONSTRAINT "FK_a881f8302e988e905ce21cdbe49"`);
        await queryRunner.query(`ALTER TABLE "PatientProblems" DROP COLUMN "staffId"`);
    }

}
