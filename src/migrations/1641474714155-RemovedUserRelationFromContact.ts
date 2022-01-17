import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUserRelationFromContact1641474714155 implements MigrationInterface {
    name = 'RemovedUserRelationFromContact1641474714155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "fax"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "stateImmunizationId"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "checkPayableTo"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "bankAccount"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "pos"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "merchantId"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "hpsaModifier"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "serviceLocationQualifies"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "excludeChargesFromPatient"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "code" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "cliaIdNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "insurancePlanType" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "mammographyCertificationNumber" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."Facilities_servicecode_enum" AS ENUM('AMBULANCE - LAND [41]', 'AMBULANCE - AIR OR WATER [42]', 'AMBULATORY SURGICAL CENTER [24]', 'ASSISTED LIVING [13]', 'BIRTHING CENTER [25]', 'COMMUNITY MENTAL HEALTH CENTER [53]', 'COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]', 'COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]', 'CUSTODIAL CARE FACILITY [33]', 'EMERGENCY ROOM [23]', 'END STAGE RENAL DISEASE TREATMENT FACILITY [65]', 'FEDERALLY QUALIFIED HEALTH CENTER [50]', 'GROUP HOME [14]', 'HOMELESS SHELTER [04]', 'HOSPICE [34]', 'INDEPENDENT CLINIC [49]', 'INDEPENDENT LABORATORY [81]', 'INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]', 'INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]')`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "serviceCode" "public"."Facilities_servicecode_enum" NOT NULL DEFAULT 'AMBULATORY SURGICAL CENTER [24]'`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "npi"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "npi" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP CONSTRAINT "REL_3559708e3492b03b67d9a35a9d"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD CONSTRAINT "FK_ab6830db721448b2b57bdf32795" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP CONSTRAINT "FK_ab6830db721448b2b57bdf32795"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "REL_3559708e3492b03b67d9a35a9d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "npi"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "npi" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "facilityId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "serviceCode"`);
        await queryRunner.query(`DROP TYPE "public"."Facilities_servicecode_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "mammographyCertificationNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "insurancePlanType"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "cliaIdNumber"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "public"."Staff" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "excludeChargesFromPatient" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "serviceLocationQualifies" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "hpsaModifier" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "merchantId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "pos" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "bankAccount" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "checkPayableTo" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "stateImmunizationId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "fax" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "mobile" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Facilities" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ADD CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
