import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientVitals1649227094133 implements MigrationInterface {
    name = 'PatientVitals1649227094133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_unittype_enum" AS ENUM('Inch', 'Centimeter')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_weightunit_enum" AS ENUM('Pound', 'Kg', 'Pound-Ounce')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_headcircumference_enum" AS ENUM('Inch', 'Centimeter')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_temperatureunittype_enum" AS ENUM('DegF', 'DegC')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientVital_smokingstatus_enum" AS ENUM('NeverSmoked', 'CurrentEveryDaySmoker', 'CurrentSomeDaySmoker', 'FormerSmoker', 'SmokerCurrentStatusUnknown', 'UnknownIfEverSmocked')`);
        await queryRunner.query(`CREATE TABLE "PatientVital" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitType" "public"."PatientVital_unittype_enum" NOT NULL DEFAULT 'Inch', "weightUnit" "public"."PatientVital_weightunit_enum" NOT NULL DEFAULT 'Pound', "headCircumference" "public"."PatientVital_headcircumference_enum" NOT NULL DEFAULT 'Centimeter', "temperatureUnitType" "public"."PatientVital_temperatureunittype_enum" NOT NULL DEFAULT 'DegC', "smokingStatus" "public"."PatientVital_smokingstatus_enum" NOT NULL DEFAULT 'NeverSmoked', "patientTemperature" character varying, "bloodPressure" character varying, "respiratoryRate" character varying, "oxygenSaturation" character varying, "PatientHeight" character varying, "PatientWeight" character varying, "PatientBMI" character varying, "PainRange" character varying, "patientHeadCircumference" character varying, "vitalCreationDate" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_e3fe43637d6722d4d0164c7bea2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PatientVital"`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_smokingstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_temperatureunittype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_headcircumference_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_weightunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientVital_unittype_enum"`);
    }

}
