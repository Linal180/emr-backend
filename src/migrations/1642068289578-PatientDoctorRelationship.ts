import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientDoctorRelationship1642068289578 implements MigrationInterface {
    name = 'PatientDoctorRelationship1642068289578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "DoctorPatients" ("doctorsId" uuid NOT NULL, "patientsId" uuid NOT NULL, CONSTRAINT "PK_de1befc4ec70fee66ac9fd6f45d" PRIMARY KEY ("doctorsId", "patientsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bc3da27f5cbb57c71b78d2852" ON "DoctorPatients" ("doctorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_34d0130daa46cb0b222413da17" ON "DoctorPatients" ("patientsId") `);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_34d0130daa46cb0b222413da175" FOREIGN KEY ("patientsId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526"`);
        await queryRunner.query(`DROP INDEX "IDX_34d0130daa46cb0b222413da17"`);
        await queryRunner.query(`DROP INDEX "IDX_9bc3da27f5cbb57c71b78d2852"`);
        await queryRunner.query(`DROP TABLE "DoctorPatients"`);
    }

}
