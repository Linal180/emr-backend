import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingPatientEntity1641906260617 implements MigrationInterface {
    name = 'AddingPatientEntity1641906260617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Patients_gender_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`CREATE TYPE "Patients_registrationdepartment_enum" AS ENUM('hospital', 'lab', 'clinic')`);
        await queryRunner.query(`CREATE TYPE "Patients_primarydepartment_enum" AS ENUM('hospital', 'lab', 'clinic')`);
        await queryRunner.query(`CREATE TYPE "Patients_race_enum" AS ENUM('White', 'Black or African American', 'Asian', 'American Indian or Alaska Native', 'Native Hawaiian or Pacific Islander', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "Patients_ethnicity_enum" AS ENUM('none', 'centeral American', 'centeral American Indian')`);
        await queryRunner.query(`CREATE TYPE "Patients_maritialstatus_enum" AS ENUM('single', 'maried', 'Widowed', 'Separated', 'Divorced')`);
        await queryRunner.query(`CREATE TYPE "Patients_sexualorientation_enum" AS ENUM('Lesbian, gay or homosexual', 'Straight or heterosexual', 'Bisexual', 'Don''t know', 'Choose not to disclose')`);
        await queryRunner.query(`CREATE TYPE "Patients_genderidentity_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`CREATE TYPE "Patients_sexatbirth_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`CREATE TYPE "Patients_pronouns_enum" AS ENUM('he, him, his', 'she, her, hers', 'Choose not to disclose')`);
        await queryRunner.query(`CREATE TYPE "Patients_homebound_enum" AS ENUM('Yes', 'No')`);
        await queryRunner.query(`CREATE TYPE "Patients_holdstatement_enum" AS ENUM('Do not hold statement', 'Bad Address - Invalid Address', 'Bad Address - No forwading Address', 'Bankruptcy', 'Claims on canceled payment plans', 'Icorrect Guarantor', 'Patient is deseased', 'Patient''s account number is too long', 'Practice-Request')`);
        await queryRunner.query(`CREATE TABLE "Patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "suffix" character varying, "firstName" character varying, "middleName" character varying, "lastName" character varying, "firstNameUsed" character varying, "prefferedName" character varying, "previousFirstName" character varying, "previouslastName" character varying, "motherMaidenName" character varying, "ssn" character varying, "gender" "Patients_gender_enum" NOT NULL DEFAULT 'Identifies as Male', "dob" character varying, "registrationDepartment" "Patients_registrationdepartment_enum" NOT NULL DEFAULT 'hospital', "primaryDepartment" "Patients_primarydepartment_enum" NOT NULL DEFAULT 'hospital', "registrationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deseasedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "privacyNotice" boolean DEFAULT false, "relaseOfInfoBill" boolean DEFAULT false, "callToConsent" boolean DEFAULT false, "medicationHistoryAuthority" boolean DEFAULT false, "patientNote" character varying, "language" character varying, "race" "Patients_race_enum" NOT NULL DEFAULT 'OTHER', "ethnicity" "Patients_ethnicity_enum" NOT NULL DEFAULT 'none', "maritialStatus" "Patients_maritialstatus_enum" NOT NULL DEFAULT 'single', "sexualOrientation" "Patients_sexualorientation_enum" NOT NULL DEFAULT 'Choose not to disclose', "genderIdentity" "Patients_genderidentity_enum" NOT NULL DEFAULT 'Choose not to disclose', "sexAtBirth" "Patients_sexatbirth_enum" NOT NULL DEFAULT 'Choose not to disclose', "pronouns" "Patients_pronouns_enum" NOT NULL DEFAULT 'Choose not to disclose', "homeBound" "Patients_homebound_enum" NOT NULL DEFAULT 'No', "holdStatement" "Patients_holdstatement_enum" NOT NULL DEFAULT 'Do not hold statement', "statementDelivereOnline" boolean DEFAULT false, "statementNote" character varying, "statementNoteDateFrom" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "statementNoteDateTo" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9cb4d71eb7ec74c115f3b619841" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Patients"`);
        await queryRunner.query(`DROP TYPE "Patients_holdstatement_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_homebound_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_pronouns_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_sexatbirth_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_genderidentity_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_sexualorientation_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_maritialstatus_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_ethnicity_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_race_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_primarydepartment_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_registrationdepartment_enum"`);
        await queryRunner.query(`DROP TYPE "Patients_gender_enum"`);
    }

}
