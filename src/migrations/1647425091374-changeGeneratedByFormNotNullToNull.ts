import {MigrationInterface, QueryRunner} from "typeorm";

export class changeGeneratedByFormNotNullToNull1647425091374 implements MigrationInterface {
    name = 'changeGeneratedByFormNotNullToNull1647425091374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "generatedBy" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Invoice" ALTER COLUMN "generatedBy" SET NOT NULL`);
    }

}
