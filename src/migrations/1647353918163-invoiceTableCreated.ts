import {MigrationInterface, QueryRunner} from "typeorm";

export class invoiceTableCreated1647353918163 implements MigrationInterface {
    name = 'invoiceTableCreated1647353918163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Invoice_billingtype_enum" AS ENUM('self_pay', 'insurance')`);
        await queryRunner.query(`CREATE TYPE "public"."Invoice_status_enum" AS ENUM('paid', 'insurance_claim', 'pending')`);
        await queryRunner.query(`CREATE TABLE "Invoice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionId" character varying NOT NULL, "generatedBy" character varying NOT NULL, "billingType" "public"."Invoice_billingtype_enum" NOT NULL DEFAULT 'self_pay', "paymentMethod" character varying NOT NULL, "status" "public"."Invoice_status_enum" NOT NULL DEFAULT 'pending', "amount" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0ead03cb5a20e5a5cc4d6defbe6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Invoice"`);
        await queryRunner.query(`DROP TYPE "public"."Invoice_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Invoice_billingtype_enum"`);
    }

}
