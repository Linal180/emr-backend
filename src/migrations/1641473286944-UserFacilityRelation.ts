import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFacilityRelation1641473286944 implements MigrationInterface {
    name = 'UserFacilityRelation1641473286944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "phone" character varying, "mobile" character varying, "pager" character varying, "fax" character varying, "address" character varying, "address2" character varying, "zipCode" character varying, "city" character varying, "state" character varying, "country" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "facilityId" uuid, "userId" uuid, CONSTRAINT "REL_3559708e3492b03b67d9a35a9d" UNIQUE ("userId"), CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "Doctors_speciality_enum" AS ENUM('Physician Assistant', 'Pharmacist', 'Periodontics', 'Pediatric Dentist', 'Pediatric Dermatology', 'Neurology', 'Gastroenterology')`);
        await queryRunner.query(`CREATE TYPE "Doctors_ssntype_enum" AS ENUM('OASDI', 'Tanf', 'Medicare', 'medicaid')`);
        await queryRunner.query(`CREATE TYPE "Doctors_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "Doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "prefix" character varying, "suffix" character varying, "email" character varying, "providerIntials" character varying, "degreeCredentials" character varying, "speciality" "Doctors_speciality_enum" NOT NULL DEFAULT 'Gastroenterology', "dob" character varying, "ssn" character varying, "ssnType" "Doctors_ssntype_enum" NOT NULL DEFAULT 'medicaid', "taxonomyCode" character varying, "deaNumber" character varying, "deaActiveDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deaTermDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "languagesSpoken" character varying, "gender" "Doctors_gender_enum" NOT NULL DEFAULT 'male', "taxId" character varying, "npi" character varying, "upin" character varying, "emcProviderId" character varying, "billingFacility" character varying, "medicareGrpNumber" character varying, "medicaidGrpNumber" character varying, "meammographyCertNumber" character varying, "campusGrpNumber" character varying, "blueShildNumber" character varying, "taxIdStuff" character varying, "specialityLicense" character varying, "anesthesiaLicense" character varying, "dpsCtpNumber" character varying, "stateLicense" character varying, "licenseActiveDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "licenseTermDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "prescriptiveAuthNumber" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c7db451695b80fdaffa17ce8804" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Contacts" ADD CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_3559708e3492b03b67d9a35a9d4"`);
        await queryRunner.query(`ALTER TABLE "Contacts" DROP CONSTRAINT "FK_777777d5cefcbffe0bdb6a4da73"`);
        await queryRunner.query(`DROP TABLE "Doctors"`);
        await queryRunner.query(`DROP TYPE "Doctors_gender_enum"`);
        await queryRunner.query(`DROP TYPE "Doctors_ssntype_enum"`);
        await queryRunner.query(`DROP TYPE "Doctors_speciality_enum"`);
        await queryRunner.query(`DROP TABLE "Contacts"`);
    }

}
