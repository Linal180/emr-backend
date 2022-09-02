import {MigrationInterface, QueryRunner} from "typeorm";

export class addCoulmnInPatientTable1652940506331 implements MigrationInterface {
    name = 'addCoulmnInPatientTable1652940506331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ADD "patientNoteOpen" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "patientNoteOpen"`);
    }

}
