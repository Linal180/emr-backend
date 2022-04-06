import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientVitalsRelationWithStaff1649229443028 implements MigrationInterface {
    name = 'PatientVitalsRelationWithStaff1649229443028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD "addedById" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ADD CONSTRAINT "FK_e0b331ac28e106db99c50a41b69" FOREIGN KEY ("addedById") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP CONSTRAINT "FK_e0b331ac28e106db99c50a41b69"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" DROP COLUMN "addedById"`);
    }

}
