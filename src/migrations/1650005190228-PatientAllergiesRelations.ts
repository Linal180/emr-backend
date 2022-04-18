import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllergiesRelations1650005190228 implements MigrationInterface {
    name = 'PatientAllergiesRelations1650005190228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "allergyId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_40c68e4f71bf6bb46ac365d2212" FOREIGN KEY ("allergyId") REFERENCES "Allergies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_40c68e4f71bf6bb46ac365d2212"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "allergyId"`);
    }

}
