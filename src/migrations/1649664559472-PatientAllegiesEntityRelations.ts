import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllegiesEntityRelations1649664559472 implements MigrationInterface {
    name = 'PatientAllegiesEntityRelations1649664559472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "staffId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "appointmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_30e18c5c3224687d341d8c7d0c4" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_5f152642844e6fa47e34b21d1cb" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_b75e0729c80210a67519bd4c54f" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_b75e0729c80210a67519bd4c54f"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_5f152642844e6fa47e34b21d1cb"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_30e18c5c3224687d341d8c7d0c4"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "appointmentId"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "staffId"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "doctorId"`);
    }

}
