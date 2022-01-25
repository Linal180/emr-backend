import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientRelationsFixes1643097185440 implements MigrationInterface {
    name = 'PatientRelationsFixes1643097185440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" DROP CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526"`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526"`);
        await queryRunner.query(`ALTER TABLE "Employers" DROP CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
