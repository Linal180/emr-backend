import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipFamilyHistoryAndRelativeEntities1663075474382 implements MigrationInterface {
    name = 'addRelationshipFamilyHistoryAndRelativeEntities1663075474382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistoryRelative" ADD "familyHistoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "FamilyHistoryRelative" ADD CONSTRAINT "FK_6a9b306c686c5deaa11979d1113" FOREIGN KEY ("familyHistoryId") REFERENCES "FamilyHistory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "FamilyHistoryRelative" DROP CONSTRAINT "FK_6a9b306c686c5deaa11979d1113"`);
        await queryRunner.query(`ALTER TABLE "FamilyHistoryRelative" DROP COLUMN "familyHistoryId"`);
    }

}
