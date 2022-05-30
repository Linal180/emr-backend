import {MigrationInterface, QueryRunner} from "typeorm";

export class insuranceEntityAdded1653486866121 implements MigrationInterface {
    name = 'insuranceEntityAdded1653486866121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Insurances_type_enum" AS ENUM('Par', 'Non-Par')`);
        await queryRunner.query(`CREATE TABLE "Insurances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payerId" character varying NOT NULL, "payerName" character varying NOT NULL, "enrollmentRequired" boolean DEFAULT false, "type" "public"."Insurances_type_enum" NOT NULL, "lineOfBusiness" character varying NOT NULL, "state" character varying, "realTimeEligibility" boolean DEFAULT false, "realTimeClaimStatus" boolean DEFAULT false, "electronicRemittanceAdvice" boolean DEFAULT false, "secondaryCoordinationBenefits" boolean DEFAULT false, "Note" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9defebeb08b3ba9fddb71a1e9df" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Insurances"`);
        await queryRunner.query(`DROP TYPE "public"."Insurances_type_enum"`);
    }

}
