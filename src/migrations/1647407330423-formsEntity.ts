import {MigrationInterface, QueryRunner} from "typeorm";

export class formsEntity1647407330423 implements MigrationInterface {
    name = 'formsEntity1647407330423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Forms_type_enum" AS ENUM('Appointment', 'Doctor', 'Patient', 'Staff')`);
        await queryRunner.query(`CREATE TABLE "Forms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."Forms_type_enum" NOT NULL DEFAULT 'Appointment', "facilityId" character varying, "layout" character varying NOT NULL, "isSystemForm" boolean DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_d034bd2b3fbe8c4d20cca4daa86" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Forms"`);
        await queryRunner.query(`DROP TYPE "public"."Forms_type_enum"`);
    }

}
