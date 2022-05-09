import {MigrationInterface, QueryRunner} from "typeorm";

export class TestSpecimensAndLabTestsRelationship1650541444589 implements MigrationInterface {
    name = 'TestSpecimensAndLabTestsRelationship1650541444589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "LabTests" DROP CONSTRAINT "FK_dca5c59d1c6fc81b2cc2c938e41"`);
        // await queryRunner.query(`ALTER TABLE "LabTests" DROP COLUMN "testSpecimensId"`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" ADD "labTestId" uuid`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" ADD CONSTRAINT "FK_0602065f263d9ea302b706908d9" FOREIGN KEY ("labTestId") REFERENCES "LabTests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "TestSpecimens" DROP CONSTRAINT "FK_0602065f263d9ea302b706908d9"`);
        await queryRunner.query(`ALTER TABLE "TestSpecimens" DROP COLUMN "labTestId"`);
        // await queryRunner.query(`ALTER TABLE "LabTests" ADD "testSpecimensId" uuid`);
        // await queryRunner.query(`ALTER TABLE "LabTests" ADD CONSTRAINT "FK_dca5c59d1c6fc81b2cc2c938e41" FOREIGN KEY ("testSpecimensId") REFERENCES "TestSpecimens"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
