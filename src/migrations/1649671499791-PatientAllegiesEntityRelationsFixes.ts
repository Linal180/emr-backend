import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllegiesEntityRelationsFixes1649671499791 implements MigrationInterface {
    name = 'PatientAllegiesEntityRelationsFixes1649671499791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientAllergies" DROP COLUMN "allergyType"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_allergytype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."Allergies_allergytype_enum" AS ENUM('drug', 'food', 'environment')`);
        await queryRunner.query(`ALTER TABLE "Allergies" ADD "allergyType" "public"."Allergies_allergytype_enum" NOT NULL DEFAULT 'food'`);
        await queryRunner.query(`ALTER TABLE "Allergies" ADD "drugAllergyTypes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Allergies" DROP COLUMN "drugAllergyTypes"`);
        await queryRunner.query(`ALTER TABLE "Allergies" DROP COLUMN "allergyType"`);
        await queryRunner.query(`DROP TYPE "public"."Allergies_allergytype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_allergytype_enum" AS ENUM('drug', 'environment', 'food')`);
        await queryRunner.query(`ALTER TABLE "PatientAllergies" ADD "allergyType" "public"."PatientAllergies_allergytype_enum" NOT NULL DEFAULT 'food'`);
    }

}
