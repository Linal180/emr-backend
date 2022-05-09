import {MigrationInterface, QueryRunner} from "typeorm";

export class OBSERVATIONENTTIY1650543121209 implements MigrationInterface {
    name = 'OBSERVATIONENTTIY1650543121209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Observations_abnormalflag_enum" AS ENUM('None', 'Below low normal', 'Above high normal', 'Below lower panic limits', 'Above upper panic limits', 'Below absolute low-off instrument scale', 'Above absolute high-off instrument scale', 'Normal', 'Abnormal (applies to non-numeric results)', 'Very abnormal (applies to non-numeric units)', 'Significant change up', 'Significant change down', 'Better--use when direction not relevant', 'Worse--use when direction not relevant', 'Susceptible. Indicates for microbiology susceptibilities only', 'Resistant. Indicates for microbiology susceptibilities only', 'Intermediate. Indicates for microbiology susceptibilities only', 'Moderately susceptible', 'Very susceptible')`);
        await queryRunner.query(`CREATE TABLE "Observations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorsSignOff" boolean DEFAULT false, "resultValue" character varying, "resultUnit" character varying, "normalRange" character varying, "normalRangeUnit" character varying, "abnormalFlag" "public"."Observations_abnormalflag_enum" NOT NULL DEFAULT 'None', "description" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_5b8c495bed9198d242c863e962a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Observations"`);
        await queryRunner.query(`DROP TYPE "public"."Observations_abnormalflag_enum"`);
    }

}
