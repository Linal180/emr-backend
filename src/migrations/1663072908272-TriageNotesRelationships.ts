import {MigrationInterface, QueryRunner} from "typeorm";

export class TriageNotesRelationships1663072908272 implements MigrationInterface {
    name = 'TriageNotesRelationships1663072908272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TriageNotes" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" ADD CONSTRAINT "UQ_77ecae8d9bfd193ef1fb7e5ded5" UNIQUE ("appointmentId")`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" ADD CONSTRAINT "FK_662688816e4bf49785a828e1f60" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" ADD CONSTRAINT "FK_77ecae8d9bfd193ef1fb7e5ded5" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TriageNotes" DROP CONSTRAINT "FK_77ecae8d9bfd193ef1fb7e5ded5"`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" DROP CONSTRAINT "FK_662688816e4bf49785a828e1f60"`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" DROP CONSTRAINT "UQ_77ecae8d9bfd193ef1fb7e5ded5"`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "TriageNotes" DROP COLUMN "patientId"`);
    }

}
