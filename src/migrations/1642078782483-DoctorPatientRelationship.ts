import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorPatientRelationship1642078782483 implements MigrationInterface {
    name = 'DoctorPatientRelationship1642078782483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."DoctorPatients" DROP CONSTRAINT "FK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "public"."DoctorPatients" ADD CONSTRAINT "FK_34d0130daa46cb0b222413da175" FOREIGN KEY ("patientsId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."DoctorPatients" DROP CONSTRAINT "FK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "public"."DoctorPatients" ADD CONSTRAINT "FK_34d0130daa46cb0b222413da175" FOREIGN KEY ("patientsId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
