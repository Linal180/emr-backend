import {MigrationInterface, QueryRunner} from "typeorm";

export class changeSmokingStatusInPatientVitals1652788163865 implements MigrationInterface {
    name = 'changeSmokingStatusInPatientVitals1652788163865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."PatientVital_smokingstatus_enum" RENAME TO "PatientVital_smokingstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_smokingstatus_enum" AS ENUM('NeverSmoked', 'CurrentEveryDaySmoker', 'CurrentSomeDaySmoker', 'FormerSmoker', 'SmokerCurrentStatusUnknown', 'UnknownIfEverSmoked')`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" TYPE "public"."PatientVital_smokingstatus_enum" USING "smokingStatus"::"text"::"public"."PatientVital_smokingstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" SET DEFAULT 'NeverSmoked'`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_smokingstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_smokingstatus_enum_old" AS ENUM('CurrentEveryDaySmoker', 'CurrentSomeDaySmoker', 'FormerSmoker', 'NeverSmoked', 'SmokerCurrentStatusUnknown', 'UnknownIfEverSmocked')`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" TYPE "public"."PatientVital_smokingstatus_enum_old" USING "smokingStatus"::"text"::"public"."PatientVital_smokingstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "PatientVital" ALTER COLUMN "smokingStatus" SET DEFAULT 'NeverSmoked'`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_smokingstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."PatientVital_smokingstatus_enum_old" RENAME TO "PatientVital_smokingstatus_enum"`);
    }

}
