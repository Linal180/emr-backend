import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPatientEmergencyContact1641908021896 implements MigrationInterface {
    name = 'AddingPatientEmergencyContact1641908021896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_9f48bf97ca4e9182bb748816caa" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_9f48bf97ca4e9182bb748816caa"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "patientId"`);
    }

}
