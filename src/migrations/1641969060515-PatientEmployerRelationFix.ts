import { MigrationInterface, QueryRunner } from "typeorm";

export class PatientEmployerRelationFix1641969060515 implements MigrationInterface {
    name = 'PatientEmployerRelationFix1641969060515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Employers" DROP CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615"`);
        await queryRunner.query(`ALTER TABLE "public"."Employers" DROP CONSTRAINT "UQ_cad3911f5b84d05e4d8f3012615"`);
        await queryRunner.query(`ALTER TABLE "public"."Employers" ADD CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Employers" DROP CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615"`);
        await queryRunner.query(`ALTER TABLE "public"."Employers" ADD CONSTRAINT "UQ_cad3911f5b84d05e4d8f3012615" UNIQUE ("patientId")`);
        await queryRunner.query(`ALTER TABLE "public"."Employers" ADD CONSTRAINT "FK_cad3911f5b84d05e4d8f3012615" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
