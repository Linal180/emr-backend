import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCascadingInvaccineProduct1666333580420 implements MigrationInterface {
    name = 'removeCascadingInvaccineProduct1666333580420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP CONSTRAINT "FK_22561ef56592b84e431b5db44c4"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD CONSTRAINT "FK_22561ef56592b84e431b5db44c4" FOREIGN KEY ("ndcCodeId") REFERENCES "NDC"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9" FOREIGN KEY ("cvxId") REFERENCES "CVX"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1" FOREIGN KEY ("mvxId") REFERENCES "MVX"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9"`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" DROP CONSTRAINT "FK_22561ef56592b84e431b5db44c4"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_f4e60beeceeb76cf661820b32b1" FOREIGN KEY ("mvxId") REFERENCES "MVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9" FOREIGN KEY ("cvxId") REFERENCES "CVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "NdcVaccineProduct" ADD CONSTRAINT "FK_22561ef56592b84e431b5db44c4" FOREIGN KEY ("ndcCodeId") REFERENCES "NDC"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
