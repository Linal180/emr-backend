import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientDoctorCustomBridgeTable1643177047121 implements MigrationInterface {
    name = 'PatientDoctorCustomBridgeTable1643177047121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bc3da27f5cbb57c71b78d2852"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34d0130daa46cb0b222413da17"`);
        await queryRunner.query(`CREATE TABLE "Appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying, "cliaIdNumber" character varying, "federalTaxId" character varying, "isPrivate" boolean DEFAULT false, "revenueCode" character varying, "color" character varying, "tamxonomyCode" character varying, "insurancePlanType" character varying, "timeZone" character varying, "mammographyCertificationNumber" character varying, "npi" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_8c9d0cb33b150816585a10915e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "PK_de1befc4ec70fee66ac9fd6f45d"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "PK_34d0130daa46cb0b222413da175" PRIMARY KEY ("patientsId")`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "doctorsId"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "PK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "patientsId"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "PK_6c7287e4b9d5de0bb4789140297" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "patientId" uuid`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "currentProvider" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_6d0e1fd79326330a424592080cf" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_0d8ddc0e71217f45b554c00382f"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "FK_6d0e1fd79326330a424592080cf"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "currentProvider"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "patientId"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "PK_6c7287e4b9d5de0bb4789140297"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "patientsId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "PK_34d0130daa46cb0b222413da175" PRIMARY KEY ("patientsId")`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD "doctorsId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" DROP CONSTRAINT "PK_34d0130daa46cb0b222413da175"`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "PK_de1befc4ec70fee66ac9fd6f45d" PRIMARY KEY ("doctorsId", "patientsId")`);
        await queryRunner.query(`DROP TABLE "Appointments"`);
        await queryRunner.query(`CREATE INDEX "IDX_34d0130daa46cb0b222413da17" ON "DoctorPatients" ("patientsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bc3da27f5cbb57c71b78d2852" ON "DoctorPatients" ("doctorsId") `);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_9bc3da27f5cbb57c71b78d28526" FOREIGN KEY ("doctorsId") REFERENCES "Doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DoctorPatients" ADD CONSTRAINT "FK_34d0130daa46cb0b222413da175" FOREIGN KEY ("patientsId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
