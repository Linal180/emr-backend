import {MigrationInterface, QueryRunner} from "typeorm";

export class contactFieldserviceCode1642671688599 implements MigrationInterface {
    name = 'contactFieldserviceCode1642671688599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Contacts_servicecode_enum" AS ENUM('AMBULANCE - LAND [41]', 'AMBULANCE - AIR OR WATER [42]', 'AMBULATORY SURGICAL CENTER [24]', 'ASSISTED LIVING [13]', 'BIRTHING CENTER [25]', 'COMMUNITY MENTAL HEALTH CENTER [53]', 'COMPREHENSIVE INPATIENT REHABILITATION FACILITY [61]', 'COMPREHENSIVE OUTPATIENT REHABILITATION FACILITY [62]', 'CUSTODIAL CARE FACILITY [33]', 'EMERGENCY ROOM [23]', 'END STAGE RENAL DISEASE TREATMENT FACILITY [65]', 'FEDERALLY QUALIFIED HEALTH CENTER [50]', 'GROUP HOME [14]', 'HOMELESS SHELTER [04]', 'HOSPICE [34]', 'INDEPENDENT CLINIC [49]', 'INDEPENDENT LABORATORY [81]', 'INDIAN HEALTH SERVICE FREE-STANDING FACILITY [05]', 'INDIAN HEALTH SERVICE PROVIDER-BASED FACILITY [06]')`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD "serviceCode" "public"."Contacts_servicecode_enum" NOT NULL DEFAULT 'AMBULATORY SURGICAL CENTER [24]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP COLUMN "serviceCode"`);
        await queryRunner.query(`DROP TYPE "public"."Contacts_servicecode_enum"`);
    }

}
