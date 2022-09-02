import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorEntitySpecialities1649851880580 implements MigrationInterface {
    name = 'DoctorEntitySpecialities1649851880580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Doctors_speciality_enum" RENAME TO "Doctors_speciality_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Doctors_speciality_enum" AS ENUM('Physician Assistant', 'Pharmacist', 'Periodontics', 'Pediatric Dentist', 'Pediatric Dermatology', 'Neurology', 'Gastroenterology', 'General Practice', 'General Surgery', 'Allergy/Immunology', 'Otolaryngology', 'Anesthesiology', 'Cardiology', 'Dermatology', 'Family Practice', 'Interventional Pain Management', 'Internal Medicine', 'Osteopathic Manipulative Therapy', 'Neurosurgery', 'Ophthalmology', 'Obstetrics/Gynecology', 'Oral Surgery', 'Orthopedic Surgery', 'Pathology', 'Plastic and Reconstructive Surgery', 'Physical Medicine and Rehabilitation', 'Psychiatry')`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" TYPE "public"."Doctors_speciality_enum" USING "speciality"::"text"::"public"."Doctors_speciality_enum"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" SET DEFAULT 'Gastroenterology'`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_speciality_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Doctors_speciality_enum_old" AS ENUM('Gastroenterology', 'Neurology', 'Pediatric Dentist', 'Pediatric Dermatology', 'Periodontics', 'Pharmacist', 'Physician Assistant')`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" TYPE "public"."Doctors_speciality_enum_old" USING "speciality"::"text"::"public"."Doctors_speciality_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" SET DEFAULT 'Gastroenterology'`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_speciality_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Doctors_speciality_enum_old" RENAME TO "Doctors_speciality_enum"`);
    }

}
