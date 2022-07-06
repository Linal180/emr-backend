import {MigrationInterface, QueryRunner} from "typeorm";

export class DoctorSpecialityEnumUpdated1657094694902 implements MigrationInterface {
    name = 'DoctorSpecialityEnumUpdated1657094694902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."Doctors_speciality_enum" RENAME TO "Doctors_speciality_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."Doctors_speciality_enum" AS ENUM('01 General Practice', '02 General Surgery', '03 Allergy/Immunology', '04 Otolaryngology', '05 Anesthesiology', '06 Cardiology', '07 Dermatology', '08 Family Practice', '09 Interventional Pain Management', '10 Gastroenterology', '11 Internal Medicine', '12 Osteopathic Manipulative Therapy', '14 Neurosurgery', '15 Unassigned', '16 Obstetrics/Gynecology', '17 Unassigned', '18 Ophthalmology', '19 Oral Surgery (dentists only)', '20 Orthopedic Surgery', '21 Unassigned', '22 Pathology', '23 Unassigned', '24 Plastic and Reconstructive Surgery', '25 Physical Medicine and Rehabilitation', '26 Psychiatry', '27 Unassigned', '28 Colorectal Surgery (formerly proctology)', '29 Pulmonary Disease', '30 Diagnostic Radiology', '31 Unassigned', '33 Thoracic Surgery', '34 Urology', '35 Chiropractic', '36 Nuclear Medicine', '37 Pediatric Medicine', '38 Geriatric Medicine', '39 Nephrology', '40 Hand Surgery', '41 Optometry', '44 Infectious Disease', '46 Endocrinology', '48 Podiatry', '66 Rheumatology', '70 Multispecialty Clinic or Group Practice', '72 Pain Management', '76 Peripheral Vascular Disease', '77 Vascular Surgery', '78 Cardiac Surgery', '79 Addiction Medicine', '81 Critical Care (Intensivists)', '82 Hematology', '83 Hematology/Oncology', '84 Preventive Medicine', '92 Radiation Oncology', '93 Emergency Medicine', '94 Interventional Radiology', '98 Gynecological/Oncology', '99 Unknown Physician Specialty')`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" TYPE "public"."Doctors_speciality_enum" USING "speciality"::"text"::"public"."Doctors_speciality_enum"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" SET DEFAULT '01 General Practice'`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_speciality_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Doctors_speciality_enum_old" AS ENUM('Allergy/Immunology', 'Anesthesiology', 'Cardiology', 'Dermatology', 'Family Practice', 'Gastroenterology', 'General Practice', 'General Surgery', 'Internal Medicine', 'Interventional Pain Management', 'Neurology', 'Neurosurgery', 'Obstetrics/Gynecology', 'Ophthalmology', 'Oral Surgery', 'Orthopedic Surgery', 'Osteopathic Manipulative Therapy', 'Otolaryngology', 'Pathology', 'Pediatric Dentist', 'Pediatric Dermatology', 'Periodontics', 'Pharmacist', 'Physical Medicine and Rehabilitation', 'Physician Assistant', 'Plastic and Reconstructive Surgery', 'Psychiatry')`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" TYPE "public"."Doctors_speciality_enum_old" USING "speciality"::"text"::"public"."Doctors_speciality_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Doctors" ALTER COLUMN "speciality" SET DEFAULT 'Gastroenterology'`);
        await queryRunner.query(`DROP TYPE "public"."Doctors_speciality_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."Doctors_speciality_enum_old" RENAME TO "Doctors_speciality_enum"`);
    }

}
