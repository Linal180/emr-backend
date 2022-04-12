import {MigrationInterface, QueryRunner} from "typeorm";

export class PatientAllegiesEntity1649664334549 implements MigrationInterface {
    name = 'PatientAllegiesEntity1649664334549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_allergytype_enum" AS ENUM('drug', 'food', 'environment')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_allergyseverity_enum" AS ENUM('mild', 'acute', 'moderate', 'very-mild')`);
        await queryRunner.query(`CREATE TYPE "public"."PatientAllergies_allergyonset_enum" AS ENUM('childhood', 'adulthood', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "PatientAllergies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "allergyType" "public"."PatientAllergies_allergytype_enum" NOT NULL DEFAULT 'food', "allergySeverity" "public"."PatientAllergies_allergyseverity_enum" NOT NULL DEFAULT 'mild', "allergyOnset" "public"."PatientAllergies_allergyonset_enum" NOT NULL DEFAULT 'adulthood', "allergyStartDate" character varying, "comments" character varying, "isActive" boolean, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_9cf263be69cf507a91dedebe4ed" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "PatientAllergies"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_allergyonset_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_allergyseverity_enum"`);
        await queryRunner.query(`DROP TYPE "public"."PatientAllergies_allergytype_enum"`);
    }

}
