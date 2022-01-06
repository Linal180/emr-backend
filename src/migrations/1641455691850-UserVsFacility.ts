import {MigrationInterface, QueryRunner} from "typeorm";

export class UserVsFacility1641455691850 implements MigrationInterface {
    name = 'UserVsFacility1641455691850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "Dcotor_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "Dcotor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "prefix" character varying, "suffix" character varying, "email" character varying, "providerIntials" character varying, "degreeCredentials" character varying, "speciality" character varying, "dob" character varying, "ssn" character varying, "ssnType" character varying, "taxonomyCode" character varying, "deaNumber" character varying, "deaActiveDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deaTermDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "gender" "Dcotor_gender_enum" NOT NULL DEFAULT 'male', "languagesSpoken" character varying, "phone" character varying, "mobile" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "facilityId" uuid, CONSTRAINT "REL_1fa57dfffef4a1af4207556375" UNIQUE ("userId"), CONSTRAINT "PK_9384777a4f0aca968a51dbe67a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "facilityId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD CONSTRAINT "FK_ab6830db721448b2b57bdf32795" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Dcotor" ADD CONSTRAINT "FK_1fa57dfffef4a1af4207556375b" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Dcotor" ADD CONSTRAINT "FK_ac7cb817e1d4621d3e95b5c1337" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Dcotor" DROP CONSTRAINT "FK_ac7cb817e1d4621d3e95b5c1337"`);
        await queryRunner.query(`ALTER TABLE "Dcotor" DROP CONSTRAINT "FK_1fa57dfffef4a1af4207556375b"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP CONSTRAINT "FK_ab6830db721448b2b57bdf32795"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" DROP COLUMN "facilityId"`);
        await queryRunner.query(`ALTER TABLE "public"."Users" ADD "facilityId" character varying`);
        await queryRunner.query(`DROP TABLE "Dcotor"`);
        await queryRunner.query(`DROP TYPE "Dcotor_gender_enum"`);
    }

}
