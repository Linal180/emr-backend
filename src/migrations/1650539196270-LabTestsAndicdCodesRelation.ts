import {MigrationInterface, QueryRunner} from "typeorm";

export class LabTestsAndicdCodesRelation1650539196270 implements MigrationInterface {
    name = 'LabTestsAndicdCodesRelation1650539196270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LabTestsDiagnoses" ("labTestsId" uuid NOT NULL, "iCDCodeId" uuid NOT NULL, CONSTRAINT "PK_ed4e3a2d94b6d59b58d6e3ccdfe" PRIMARY KEY ("labTestsId", "iCDCodeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_60ee15c5043ac58b92136de2ab" ON "LabTestsDiagnoses" ("labTestsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_30a56dcc9334508a5f228df5a3" ON "LabTestsDiagnoses" ("iCDCodeId") `);
        await queryRunner.query(`ALTER TABLE "LabTestsDiagnoses" ADD CONSTRAINT "FK_60ee15c5043ac58b92136de2abd" FOREIGN KEY ("labTestsId") REFERENCES "LabTests"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "LabTestsDiagnoses" ADD CONSTRAINT "FK_30a56dcc9334508a5f228df5a38" FOREIGN KEY ("iCDCodeId") REFERENCES "ICDCode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LabTestsDiagnoses" DROP CONSTRAINT "FK_30a56dcc9334508a5f228df5a38"`);
        await queryRunner.query(`ALTER TABLE "LabTestsDiagnoses" DROP CONSTRAINT "FK_60ee15c5043ac58b92136de2abd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30a56dcc9334508a5f228df5a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60ee15c5043ac58b92136de2ab"`);
        await queryRunner.query(`DROP TABLE "LabTestsDiagnoses"`);
    }

}
