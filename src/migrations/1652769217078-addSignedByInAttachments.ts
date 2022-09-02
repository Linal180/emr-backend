import {MigrationInterface, QueryRunner} from "typeorm";

export class addSignedByInAttachments1652769217078 implements MigrationInterface {
    name = 'addSignedByInAttachments1652769217078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" DROP COLUMN "signedByProvider"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Attachments" ADD "signedByProvider" boolean DEFAULT false`);
    }

}
