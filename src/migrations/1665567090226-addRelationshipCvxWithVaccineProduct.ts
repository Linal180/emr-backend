import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipCvxWithVaccineProduct1665567090226 implements MigrationInterface {
    name = 'addRelationshipCvxWithVaccineProduct1665567090226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "cvxId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "cvxId" uuid`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9" FOREIGN KEY ("cvxId") REFERENCES "CVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP CONSTRAINT "FK_1c98f8bcc6d0d75c6dbdbac8cf9"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" DROP COLUMN "cvxId"`);
        await queryRunner.query(`ALTER TABLE "VaccineProduct" ADD "cvxId" character varying`);
    }

}
