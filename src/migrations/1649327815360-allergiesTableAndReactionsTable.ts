import {MigrationInterface, QueryRunner} from "typeorm";

export class allergiesTableAndReactionsTable1649327815360 implements MigrationInterface {
    name = 'allergiesTableAndReactionsTable1649327815360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Allergies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_f828c03d97287ce16fb394f9475" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_unittype_enum" AS ENUM('Inch', 'Centimeter')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_weightunit_enum" AS ENUM('Pound', 'Kg', 'Pound-Ounce')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_headcircumference_enum" AS ENUM('Inch', 'Centimeter')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_temperatureunittype_enum" AS ENUM('DegF', 'DegC')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_smokingstatus_enum" AS ENUM('NeverSmoked', 'CurrentEveryDaySmoker', 'CurrentSomeDaySmoker', 'FormerSmoker', 'SmokerCurrentStatusUnknown', 'UnknownIfEverSmocked')`);
        await queryRunner.query(`CREATE TABLE "PatientAllergies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitType" "public"."PatientAllergies_unittype_enum" NOT NULL DEFAULT 'Inch', "weightUnit" "public"."PatientAllergies_weightunit_enum" NOT NULL DEFAULT 'Pound', "headCircumference" "public"."PatientAllergies_headcircumference_enum" NOT NULL DEFAULT 'Centimeter', "temperatureUnitType" "public"."PatientAllergies_temperatureunittype_enum" NOT NULL DEFAULT 'DegC', "smokingStatus" "public"."PatientAllergies_smokingstatus_enum" NOT NULL DEFAULT 'NeverSmoked', "patientTemperature" character varying, "bloodPressure" character varying, "respiratoryRate" character varying, "oxygenSaturation" character varying, "PatientHeight" character varying, "PatientWeight" character varying, "PatientBMI" character varying, "PainRange" character varying, "patientHeadCircumference" character varying, "vitalCreationDate" character varying, "patientId" uuid, "appointmentId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "addedById" uuid, CONSTRAINT "PK_9cf263be69cf507a91dedebe4ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Reactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_8e7a9226a42a2a796ce5993a5a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_b75e0729c80210a67519bd4c54f" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_d45ed2d88292968d24d95184f4f" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD CONSTRAINT "FK_7f5948b0fdb9a07fb1e4ddfe4c4" FOREIGN KEY ("addedById") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_7f5948b0fdb9a07fb1e4ddfe4c4"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_d45ed2d88292968d24d95184f4f"`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP CONSTRAINT "FK_b75e0729c80210a67519bd4c54f"`);
        await queryRunner.query(`DROP TABLE "Reactions"`);
        await queryRunner.query(`DROP TABLE "PatientAllergies"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_smokingstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_temperatureunittype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_headcircumference_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_weightunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_unittype_enum"`);
        await queryRunner.query(`DROP TABLE "Allergies"`);
    }

}
