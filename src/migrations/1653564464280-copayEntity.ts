import {MigrationInterface, QueryRunner} from "typeorm";

export class copayEntity1653564464280 implements MigrationInterface {
    name = 'copayEntity1653564464280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "copays" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying, "amount" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4ef490f91ef448a6964929e3d27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "policyHolder" DROP COLUMN "sex"`);
        await queryRunner.query(`CREATE TYPE "public"."policyHolder_sex_enum" AS ENUM('Identifies as Male', 'Identifies as Female', 'Transgender Male/Female-to-Male (FTM)', 'Transgender Female/Male-to-Female (MTF)', 'Gender non-conforming (neither exclusively male nor female)', 'Choose not to disclose')`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ADD "sex" "public"."policyHolder_sex_enum" NOT NULL DEFAULT 'Choose not to disclose'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policyHolder" DROP COLUMN "sex"`);
        await queryRunner.query(`DROP TYPE "public"."policyHolder_sex_enum"`);
        await queryRunner.query(`ALTER TABLE "policyHolder" ADD "sex" character varying`);
        await queryRunner.query(`DROP TABLE "copays"`);
    }

}
