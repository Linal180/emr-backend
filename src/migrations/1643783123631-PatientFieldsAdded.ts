import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientFieldsAdded1643783123631 implements MigrationInterface {
    name = 'PatientFieldsAdded1643783123631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Patients_preferredcommunicationmethod_enum" AS ENUM('phone', 'Voice message', 'Message', 'email')`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "preferredCommunicationMethod" "public"."Patients_preferredcommunicationmethod_enum" NOT NULL DEFAULT 'phone'`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "phonePermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "voiceCallPermission" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Patients" ADD "pharmacy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "pharmacy"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "voiceCallPermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "phonePermission"`);
        await queryRunner.query(`ALTER TABLE "Patients" DROP COLUMN "preferredCommunicationMethod"`);
        await queryRunner.query(`DROP TYPE "public"."Patients_preferredcommunicationmethod_enum"`);
    }

}
