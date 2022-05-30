import {MigrationInterface, QueryRunner} from "typeorm";

export class insuranceAndPolicyRelation1653564683435 implements MigrationInterface {
    name = 'insuranceAndPolicyRelation1653564683435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" ADD "insuranceId" uuid`);
        await queryRunner.query(`ALTER TABLE "copays" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."copays_type_enum" AS ENUM('Office Visit', 'Specialty Care', 'Allergy', 'Dermatology', 'PT/OT/ST', 'MH Group', 'MH Individual', 'ER Visit', 'OB/GYN', 'Urgent Care', 'Telehealth', 'Ambulatory Surgery', 'Audiologist', 'Brand Drug', 'Chiropractic Copayment', 'DME', 'Deductible', 'Generic Drug', 'Global', 'Lab', 'Non-Formulary Drug', 'Nurse visit', 'Office Visit - F/U', 'Office Visit - New', 'Out of Network', 'Physician''s Assistant', 'Podiatry', 'Post Op', 'Preferred Drug', 'Prenatal Care', 'Preventive Care', 'Retail/Convenience', 'Ultrasound', 'Well Child', 'Xray/Imaging')`);
        await queryRunner.query(`ALTER TABLE "copays" ADD "type" "public"."copays_type_enum" NOT NULL DEFAULT 'Office Visit'`);
        await queryRunner.query(`ALTER TABLE "policies" ADD CONSTRAINT "FK_cfdea4e3b03b4a7c23285ca87c2" FOREIGN KEY ("insuranceId") REFERENCES "Insurances"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "policies" DROP CONSTRAINT "FK_cfdea4e3b03b4a7c23285ca87c2"`);
        await queryRunner.query(`ALTER TABLE "copays" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."copays_type_enum"`);
        await queryRunner.query(`ALTER TABLE "copays" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "policies" DROP COLUMN "insuranceId"`);
    }

}
