import {MigrationInterface, QueryRunner} from "typeorm";

export class templateIdsAdded1666162774872 implements MigrationInterface {
    name = 'templateIdsAdded1666162774872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" ADD "templateIds" jsonb`);
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" ADD "templateIds" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PatientIllnessHistory" DROP COLUMN "templateIds"`);
        await queryRunner.query(`ALTER TABLE "ReviewOfSystem" DROP COLUMN "templateIds"`);
    }

}
