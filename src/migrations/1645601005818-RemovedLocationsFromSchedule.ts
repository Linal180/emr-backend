import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedLocationsFromSchedule1645601005818 implements MigrationInterface {
    name = 'RemovedLocationsFromSchedule1645601005818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedules" DROP CONSTRAINT "FK_a11ee456c1a7e72bffb6a86acdf"`);
        await queryRunner.query(`ALTER TABLE "Schedules" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TYPE "public"."Facilities_servicecode_enum" RENAME TO "Facilities_servicecode_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Facilities_servicecode_enum" AS ENUM('AMBULANCE - LAND [41]', 'Pharmacy [01]', 'Telehealth [02]', 'Telehealth Provided Other than in Patient''s Home [02]', 'School [03]', 'Tribal 638 Free-standing Facility [07]', ' Tribal 638 Provider-based Facility [08]', ' Prison/Correctional Facility [09]', 'Prison/Correctional Facility [10]', 'Telehealth Provided in Patient''s Home [10]', 'Office [11]', 'Home [12]', 'Mobile Unit [15]', 'Temporary Lodging [16]', 'Walk-in Retail Health Clinic [17]', '18-Place of Employment', 'AMBULANCE - AIR OR WATER [42]', 'AMBULATORY SURGICAL CENTER [24]', 'ASSISTED LIVING [13]', 'BIRTHING CENTER [25]', 'COMMUNITY MENTAL HEALTH CENTER [53]', 'COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]', 'COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]', 'CUSTODIAL CARE FACILITY [33]', 'EMERGENCY ROOM [23]', 'END STAGE RENAL DISEASE TREATMENT FACILITY [65]', 'FEDERALLY QUALIFIED HEALTH CENTER [50]', 'GROUP HOME [14]', 'HOMELESS SHELTER [04]', 'HOSPICE [34]', 'INDEPENDENT CLINIC [49]', 'INDEPENDENT LABORATORY [81]', 'INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]', 'INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]')`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" TYPE "public"."Facilities_servicecode_enum" USING "serviceCode"::"text"::"public"."Facilities_servicecode_enum"`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" SET DEFAULT 'AMBULATORY SURGICAL CENTER [24]'`);
        await queryRunner.query(`DROP TYPE "public"."Facilities_servicecode_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Facilities_servicecode_enum_old" AS ENUM('AMBULANCE - LAND [41]', 'AMBULANCE - AIR OR WATER [42]', 'AMBULATORY SURGICAL CENTER [24]', 'ASSISTED LIVING [13]', 'BIRTHING CENTER [25]', 'COMMUNITY MENTAL HEALTH CENTER [53]', 'COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]', 'COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]', 'CUSTODIAL CARE FACILITY [33]', 'EMERGENCY ROOM [23]', 'END STAGE RENAL DISEASE TREATMENT FACILITY [65]', 'FEDERALLY QUALIFIED HEALTH CENTER [50]', 'GROUP HOME [14]', 'HOMELESS SHELTER [04]', 'HOSPICE [34]', 'INDEPENDENT CLINIC [49]', 'INDEPENDENT LABORATORY [81]', 'INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]', 'INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]')`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" TYPE "public"."Facilities_servicecode_enum_old" USING "serviceCode"::"text"::"public"."Facilities_servicecode_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Facilities" ALTER COLUMN "serviceCode" SET DEFAULT 'AMBULATORY SURGICAL CENTER [24]'`);
        await queryRunner.query(`DROP TYPE "public"."Facilities_servicecode_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Facilities_servicecode_enum_old" RENAME TO "Facilities_servicecode_enum"`);
        await queryRunner.query(`ALTER TABLE "Schedules" ADD "locationId" uuid`);
        await queryRunner.query(`ALTER TABLE "Schedules" ADD CONSTRAINT "FK_a11ee456c1a7e72bffb6a86acdf" FOREIGN KEY ("locationId") REFERENCES "Contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
