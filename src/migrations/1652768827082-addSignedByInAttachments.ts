import {MigrationInterface, QueryRunner} from "typeorm";

export class addSignedByInAttachments1652768827082 implements MigrationInterface {
    name = 'addSignedByInAttachments1652768827082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedAt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedAt"`);
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedBy"`);
    }

}
