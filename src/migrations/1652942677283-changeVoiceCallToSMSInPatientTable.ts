import {MigrationInterface, QueryRunner} from "typeorm";

export class changeVoiceCallToSMSInPatientTable1652942677283 implements MigrationInterface {
    name = 'changeVoiceCallToSMSInPatientTable1652942677283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" RENAME COLUMN "voiceCallPermission" TO "smsPermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "patientNoteOpen" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" ALTER COLUMN "patientNoteOpen" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Patients" RENAME COLUMN "smsPermission" TO "voiceCallPermission"`);
    }

}
