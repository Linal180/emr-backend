import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientDoctorRelationshipFix1642068563495 implements MigrationInterface {
    name = 'PatientDoctorRelationshipFix1642068563495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP CONSTRAINT "FK_9123bb209b9f80f46f3a5ec6966"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP CONSTRAINT "UQ_9123bb209b9f80f46f3a5ec6966"`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" DROP COLUMN "usualProviderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD "usualProviderId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD CONSTRAINT "UQ_9123bb209b9f80f46f3a5ec6966" UNIQUE ("usualProviderId")`);
        await queryRunner.query(`ALTER TABLE "public"."Patients" ADD CONSTRAINT "FK_9123bb209b9f80f46f3a5ec6966" FOREIGN KEY ("usualProviderId") REFERENCES "Doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
