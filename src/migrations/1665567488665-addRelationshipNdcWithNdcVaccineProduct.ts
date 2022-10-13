import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipNdcWithNdcVaccineProduct1665567488665 implements MigrationInterface {
    name = 'addRelationshipNdcWithNdcVaccineProduct1665567488665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP COLUMN "ndcCodeId"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD "ndcCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD CONSTRAINT "FK_22561ef56592b84e431b5db44c4" FOREIGN KEY ("ndcCodeId") REFERENCES "NDC"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP CONSTRAINT "FK_22561ef56592b84e431b5db44c4"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP COLUMN "ndcCodeId"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD "ndcCodeId" character varying`);
    }

}
