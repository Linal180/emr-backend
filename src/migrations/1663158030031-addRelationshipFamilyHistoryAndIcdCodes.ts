import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipFamilyHistoryAndIcdCodes1663158030031 implements MigrationInterface {
    name = 'addRelationshipFamilyHistoryAndIcdCodes1663158030031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistory" ADD "icdCodeId" uuid`);
        await queryRunner.query(`ALTER TABLE "FamilyHistory" ADD CONSTRAINT "FK_5dd6b01596d418b59926bffe947" FOREIGN KEY ("icdCodeId") REFERENCES "ICDCode"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistory" DROP CONSTRAINT "FK_5dd6b01596d418b59926bffe947"`);
        await queryRunner.query(`ALTER TABLE "FamilyHistory" DROP COLUMN "icdCodeId"`);
    }

}
