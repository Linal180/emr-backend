import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorSchedule1642500624786 implements MigrationInterface {
    name = 'DoctorSchedule1642500624786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "recurringEndDate" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "doctorId" uuid, CONSTRAINT "PK_364f08c10e5a443bf4a2125e702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Schedules" ADD CONSTRAINT "FK_7c0ad2aafcca77fbe0cb86c7731" FOREIGN KEY ("doctorId") REFERENCES "Doctors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" DROP CONSTRAINT "FK_7c0ad2aafcca77fbe0cb86c7731"`);
        await queryRunner.query(`DROP TABLE "Schedules"`);
    }

}
