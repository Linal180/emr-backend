import {MigrationInterface, QueryRunner} from "typeorm";

export class changeMvxTable1665565293785 implements MigrationInterface {
    name = 'changeMvxTable1665565293785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP CONSTRAINT "FK_1066af7db3a806b5f30217349e1"`);
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxId"`);
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "cvxCode"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "notes" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MVX" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxCode" character varying`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD "cvxId" uuid`);
        await queryRunner.query(`ALTER TABLE "MVX" ADD CONSTRAINT "FK_1066af7db3a806b5f30217349e1" FOREIGN KEY ("cvxId") REFERENCES "CVX"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
