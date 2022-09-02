import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingBillingAddressEntity1641537551246 implements MigrationInterface {
    name = 'AddingBillingAddressEntity1641537551246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "BillingAddresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "phone" character varying, "mobile" character varying, "fax" character varying, "address" character varying, "address2" character varying, "zipCode" character varying, "city" character varying, "state" character varying, "country" character varying, "federalTaxId" character varying, "bankAccount" character varying, "checkPayableTo" character varying, "userId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "faciltiyId" uuid, CONSTRAINT "PK_03be7e29b2ae17b893258d42a7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "BillingAddresses" ADD CONSTRAINT "FK_556dbe6ca4399c0f4a13c1b7265" FOREIGN KEY ("faciltiyId") REFERENCES "Facilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BillingAddresses" DROP CONSTRAINT "FK_556dbe6ca4399c0f4a13c1b7265"`);
        await queryRunner.query(`ALTER TABLE "public"."Contacts" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "BillingAddresses"`);
    }

}
