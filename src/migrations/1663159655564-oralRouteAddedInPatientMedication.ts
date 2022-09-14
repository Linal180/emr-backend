import {MigrationInterface, QueryRunner} from "typeorm";

export class oralRouteAddedInPatientMedication1663159655564 implements MigrationInterface {
    name = 'oralRouteAddedInPatientMedication1663159655564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" ADD "oralRoute" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientMedication" DROP COLUMN "oralRoute"`);
    }

}
