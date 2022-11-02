import {MigrationInterface, QueryRunner} from "typeorm";

export class addImagingOrder1667210971806 implements MigrationInterface {
    name = 'addImagingOrder1667210971806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ImagingOrder_labteststatus_enum" AS ENUM('Order Entered', 'Discontinued', 'In Progress', 'Results Received', 'Results Reviewed with Patient')`);
        await queryRunner.query(`CREATE TABLE "ImagingOrder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "labTestStatus" "public"."ImagingOrder_labteststatus_enum" NOT NULL DEFAULT 'Order Entered', "orderNumber" character varying, "collectedDate" character varying, "receivedDate" character varying, "accessionNumber" character varying, "labName" character varying, "vendorName" character varying, "testDate" character varying, "testTime" character varying, "testNotes" text, "providerNotes" text, "isSigned" boolean DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_23f973c6c535ec47a957cb0c106" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ImagingOrder"`);
        await queryRunner.query(`DROP TYPE "public"."ImagingOrder_labteststatus_enum"`);
    }

}
