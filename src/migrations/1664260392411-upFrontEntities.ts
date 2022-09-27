import {MigrationInterface, QueryRunner} from "typeorm";

export class upFrontEntities1664260392411 implements MigrationInterface {
    name = 'upFrontEntities1664260392411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UpFrontPaymentType" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "paymentType" character varying, "amount" character varying, "type" character varying, "notes" character varying, "UpFrontPaymentId" character varying, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "upFrontPaymentId" uuid, CONSTRAINT "PK_e0a7ded640fcca61f14fba04add" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UpFrontPayment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_3d5a910b0861cb1bd974f574f79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" ADD CONSTRAINT "FK_37e26c1dd7b073b8b0354f7ac64" FOREIGN KEY ("upFrontPaymentId") REFERENCES "UpFrontPayment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UpFrontPaymentType" DROP CONSTRAINT "FK_37e26c1dd7b073b8b0354f7ac64"`);
        await queryRunner.query(`DROP TABLE "UpFrontPayment"`);
        await queryRunner.query(`DROP TABLE "UpFrontPaymentType"`);
    }

}
